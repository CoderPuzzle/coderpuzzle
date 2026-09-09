import textwrap
from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram
from .compiled import CompiledExecutor
from .typed import (
    cpp_type,
    encode_case,
    function_signature,
    provided_node_class,
    struct_item_spec,
    uses_struct_kinds,
)


class CppExecutor(CompiledExecutor):
    language = "cpp"
    address_space_overhead_mb = 0
    # Room for linker worker threads under parallel linking. The same cap
    # also bounds user code's runtime sandbox (see RustExecutor's note).
    max_processes = 32
    compiler_path = "/usr/bin/g++"
    benchmark_command = ("/runner/benchmarks/cpp",)
    reference_benchmark_ms = 18.0

    def prepare(
        self,
        job_root: Path,
        scratch: Path,
        code: str,
        invocation: dict[str, Any],
        limits: dict[str, Any],
        assembly: dict[str, dict[str, str]] | None = None,
    ) -> PreparedProgram:
        class_name = invocation.get("class_name", "Solution")
        if not isinstance(class_name, str) or not class_name.isidentifier():
            raise ExecutorError("Invalid C++ entry class")
        if invocation.get("type") == "design":
            from .cpp_design import prepare_design
            return prepare_design(self, job_root, scratch, code, invocation, assembly)
        if invocation.get("type") == "interactive":
            from .cpp_interactive import prepare_interactive
            return prepare_interactive(self, job_root, scratch, code, invocation, assembly)
        parameters, _, method = function_signature(invocation, self.language)

        structs = uses_struct_kinds(invocation)
        item_spec = struct_item_spec(invocation)
        # Graph and random-list nodes come from the problem's provided/
        # sources; value_type.class names each class for the codecs below.
        graph_class = provided_node_class(invocation, "graph")
        random_class = provided_node_class(invocation, "random_list")
        # The second wave keeps the provided-class model: open doubly chains
        # (LC 3263/3294) and random-pointer trees (LC 1485) decode into the
        # using problem's provided/ node class.
        doubly_class = provided_node_class(invocation, "doubly_list")
        doubly_node_class = provided_node_class(invocation, "doubly_list_node")
        random_tree_class = provided_node_class(invocation, "random_tree")
        # Manifest-named struct classes arrive from the problem's provided/
        # source; the codecs below construct them by name.
        struct_specs: dict[str, dict[str, Any]] = {}

        def collect_structs(spec: Any) -> None:
            if not isinstance(spec, dict):
                return
            if spec.get("kind") == "struct":
                struct_specs.setdefault(spec["class"], spec)
            elif spec.get("kind") == "array":
                collect_structs(spec.get("items"))

        for spec in parameters:
            collect_structs(spec)
        # Struct definitions arrive entirely as source from the problem's
        # own provided/ (docs/CODECS.md: every wire kind names the class
        # its bundle must ship) — the judge never generates a fallback
        # definition of its own. assembly_decls is embedded verbatim into
        # the compiled unit below; struct_codecs generates only the WIRE
        # CODECS (read/write templates), which reference these types by
        # name and compile against whatever the assembly provides.
        assembly_decls = "".join(
            content
            for name, content in sorted((assembly or {}).get("provided", {}).items())
            if name.endswith((".hpp", ".h", ".cpp"))
        )
        struct_codecs = ""
        # The registry of input-side node pointers backs the clone/identity
        # checks for graph, random_list, and alias_list returns: the judge
        # compares row data, so only the wrapper can catch a solution that
        # returns the input structure itself.
        struct_codecs += "static std::vector<const void*> coderpuzzle_input_nodes;\n"
        if "list" in structs:
            struct_codecs += (
                "static void coderpuzzleCollectInput(const ListNode* head) {\n"
                "    for (const ListNode* node = head; node; node = node->next) coderpuzzle_input_nodes.push_back(node);\n"
                "}\n"
            )
            struct_codecs += textwrap.dedent(
                f"""
                template <> struct CoderPuzzleDecoder<ListNode*> {{
                    static ListNode* read(CoderPuzzleReader& reader) {{
                        if (reader.byte() == 0) return nullptr;
                        uint32_t length = reader.u32();
                        ListNode* head = nullptr;
                        ListNode** cursor = &head;
                        for (uint32_t index = 0; index < length; ++index) {{
                            *cursor = new ListNode(CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                            cursor = &((*cursor)->next);
                        }}
                        return head;
                    }}
                }};
                static std::string coderpuzzle_json(const ListNode* head) {{
                    std::string output = "[";
                    bool first = true;
                    for (const ListNode* node = head; node; node = node->next) {{
                        if (!first) output += ',';
                        first = false;
                        output += coderpuzzle_json(node->val);
                    }}
                    return output + "]";
                }}
                """
            )
        # The plain n-ary display serves three kinds: nary_tree itself, the
        # LC 1506 node-list handover (which decodes the same tree), and the
        # LC 1516 ref (whose DFS helper walks the decoded tree).
        if structs & {"nary_tree", "nary_tree_nodes", "nary_tree_ref"}:
            struct_codecs += textwrap.dedent(
                f"""
                template <> struct CoderPuzzleDecoder<Node*> {{
                    static Node* read(CoderPuzzleReader& reader) {{
                        uint32_t length = reader.u32();
                        std::vector<std::pair<bool, {cpp_type(item_spec)}>> slots;
                        slots.reserve(length);
                        for (uint32_t index = 0; index < length; ++index) {{
                            if (reader.byte() == 1) slots.emplace_back(true, CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                            else slots.emplace_back(false, {cpp_type(item_spec)}());
                        }}
                        if (length == 0 || !slots[0].first) return nullptr;
                        Node* root = new Node(slots[0].second);
                        std::deque<Node*> queue{{root}};
                        // Display wire: slot 1 closes the root group, then
                        // every node's children run until that node's own
                        // separator slot. Tolerate the marker's absence for
                        // hand-written inputs.
                        size_t index = (length > 1 && slots[1].first) ? 1 : 2;
                        while (!queue.empty() && index < slots.size()) {{
                            Node* node = queue.front();
                            queue.pop_front();
                            while (index < slots.size() && slots[index].first) {{
                                Node* child = new Node(slots[index].second);
                                node->children.push_back(child);
                                queue.push_back(child);
                                ++index;
                            }}
                            if (index < slots.size()) ++index;  // group separator
                        }}
                        return root;
                    }}
                }};
                // Display wire: root value, the marker closing the root
                // group, then each node's children followed by its own
                // marker; trailing markers are trimmed.
                static std::string coderpuzzle_json(const Node* root) {{
                    if (root == nullptr) return "[]";
                    std::string output = "[" + coderpuzzle_json(root->val) + ",null";
                    std::deque<const Node*> queue{{root}};
                    while (!queue.empty()) {{
                        const Node* node = queue.front();
                        queue.pop_front();
                        for (const Node* child : node->children) {{
                            output += ',' + coderpuzzle_json(child->val);
                            queue.push_back(child);
                        }}
                        output += ",null";
                    }}
                    while (output.size() > 5 && output.compare(output.size() - 5, 5, ",null") == 0) {{
                        output.erase(output.size() - 5);
                    }}
                    return output + "]";
                }}
                static std::string coderpuzzle_result(Node* root) {{ return coderpuzzle_json(root); }}
                """
            )
            if "nary_tree_ref" in structs:
                struct_codecs += textwrap.dedent(
                    f"""
                    // LC 1516: an nary_tree_ref names a node of an
                    // already-decoded tree by its (unique) value; the
                    // argument is that exact node, sharing identity with
                    // the aliased tree.
                    static Node* coderpuzzleFindNaryNode(Node* root, {cpp_type(item_spec)} target) {{
                        if (root == nullptr) return nullptr;
                        if (root->val == target) return root;
                        for (Node* child : root->children) {{
                            Node* found = coderpuzzleFindNaryNode(child, target);
                            if (found != nullptr) return found;
                        }}
                        return nullptr;
                    }}
                    """
                )
        if "quad_tree" in structs:
            struct_codecs += textwrap.dedent(
                """
                template <> struct CoderPuzzleDecoder<QuadNode*> {
                    static QuadNode* read(CoderPuzzleReader& reader) {
                        if (reader.byte() == 0) return nullptr;
                        bool isLeaf = reader.byte() == 1;
                        bool val = reader.byte() == 1;
                        QuadNode* node = new QuadNode(val, isLeaf);
                        if (!isLeaf) {
                            node->topLeft = read(reader);
                            node->topRight = read(reader);
                            node->bottomLeft = read(reader);
                            node->bottomRight = read(reader);
                        }
                        return node;
                    }
                };
                // LC display wire: a flat preorder of [isLeaf, val] pairs
                // inside one enclosing array; a non-leaf's val normalizes
                // to 0 on both sides.
                static void coderpuzzleAppendQuad(std::string& output, const QuadNode* node) {
                    if (node == nullptr) { output += "null"; return; }
                    if (node->isLeaf) { output += node->val ? "[1,1]" : "[1,0]"; return; }
                    output += "[0,0]";
                    const QuadNode* sides[4] = {node->topLeft, node->topRight, node->bottomLeft, node->bottomRight};
                    for (const QuadNode* side : sides) {
                        output += ',';
                        coderpuzzleAppendQuad(output, side);
                    }
                }
                static std::string coderpuzzle_result(QuadNode* node) {
                    if (node == nullptr) return "null";
                    std::string output = "[";
                    coderpuzzleAppendQuad(output, node);
                    return output + "]";
                }
                """
            )
        if "nested" in structs:
            struct_codecs += textwrap.dedent(
                """
                template <> struct CoderPuzzleDecoder<NestedInteger> {
                    static NestedInteger read(CoderPuzzleReader& reader) {
                        unsigned char tag = reader.byte();
                        if (tag == 1) return NestedInteger(static_cast<long long>(static_cast<int32_t>(reader.u32())));
                        if (tag != 2) throw std::runtime_error("Invalid nested tag");
                        uint32_t length = reader.u32();
                        NestedInteger value;
                        for (uint32_t index = 0; index < length; ++index) value.add(read(reader));
                        return value;
                    }
                };
                static std::string coderpuzzle_json(const NestedInteger& value) {
                    if (value.isInteger()) return std::to_string(value.getInteger());
                    std::string output = "[";
                    const auto& list = value.getList();
                    for (size_t index = 0; index < list.size(); ++index) {
                        if (index) output += ',';
                        output += coderpuzzle_json(list[index]);
                    }
                    return output + "]";
                }
                """
            )
        if "next_tree" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                template <> struct CoderPuzzleDecoder<NodeWithNext*> {{
                    static NodeWithNext* read(CoderPuzzleReader& reader) {{
                        uint32_t length = reader.u32();
                        std::vector<std::pair<bool, {cpp_type(item_spec)}>> slots;
                        slots.reserve(length);
                        for (uint32_t index = 0; index < length; ++index) {{
                            if (reader.byte() == 1) slots.emplace_back(true, CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                            else slots.emplace_back(false, {cpp_type(item_spec)}());
                        }}
                        if (length == 0 || !slots[0].first) return nullptr;
                        NodeWithNext* root = new NodeWithNext(slots[0].second);
                        std::deque<NodeWithNext*> queue{{root}};
                        size_t index = 1;
                        while (!queue.empty() && index < slots.size()) {{
                            NodeWithNext* node = queue.front();
                            queue.pop_front();
                            // every dequeued node consumes two slots — a
                            // null child still takes its slot (binary_tree
                            // decoder convention) — and each child's
                            // parent back-link is wired (the LC 510 wire)
                            if (index < slots.size()) {{
                                if (slots[index].first) {{
                                    node->left = new NodeWithNext(slots[index].second);
                                    node->left->parent = node;
                                    queue.push_back(node->left);
                                }}
                                ++index;
                            }}
                            if (index < slots.size()) {{
                                if (slots[index].first) {{
                                    node->right = new NodeWithNext(slots[index].second);
                                    node->right->parent = node;
                                    queue.push_back(node->right);
                                }}
                                ++index;
                            }}
                        }}
                        return root;
                    }}
                }};
                // LC display wire: values with a null marker between
                // adjacent levels, trailing markers trimmed. Each level is
                // read through the solution-populated next chain; the next
                // level starts at the first child found anywhere in this
                // level (left or right — the level's first node need not
                // have a left child).
                static std::string coderpuzzle_result(NodeWithNext* root) {{
                    std::vector<std::string> parts;
                    for (const NodeWithNext* level = root; level; ) {{
                        const NodeWithNext* nextLevel = nullptr;
                        for (const NodeWithNext* node = level; node; node = node->next) {{
                            parts.push_back(coderpuzzle_json(node->val));
                            if (nextLevel == nullptr) {{
                                if (node->left != nullptr) nextLevel = node->left;
                                else if (node->right != nullptr) nextLevel = node->right;
                            }}
                        }}
                        parts.push_back("null");
                        level = nextLevel;
                    }}
                    while (!parts.empty() && parts.back() == "null") parts.pop_back();
                    std::string output = "[";
                    for (size_t index = 0; index < parts.size(); ++index) {{
                        if (index) output += ',';
                        output += parts[index];
                    }}
                    return output + "]";
                }}
                """
            )
        if "circular_list" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                // A circular wire carries the ring's values; the decoder
                // closes the ring (tail->next = head) exactly like the
                // harness languages, so solutions see a genuine ring.
                // Reuses the ListNode decoder slot — a bundle uses one
                // list kind.
                template <> struct CoderPuzzleDecoder<ListNode*> {{
                    static ListNode* read(CoderPuzzleReader& reader) {{
                        uint32_t length = reader.u32();
                        if (length == 0) return nullptr;
                        ListNode* head = new ListNode(CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                        ListNode* tail = head;
                        for (uint32_t index = 1; index < length; ++index) {{
                            tail->next = new ListNode(CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                            tail = tail->next;
                        }}
                        tail->next = head;
                        return head;
                    }}
                }};
                static std::string coderpuzzle_result(ListNode* head) {{
                    if (head == nullptr) return "[]";
                    std::string output = "[";
                    const ListNode* node = head;
                    for (size_t bound = 0; bound < (1u << 20); ++bound) {{
                        if (node != head) output += ',';
                        output += coderpuzzle_json(node->val);
                        node = node->next;
                        if (node == head) return output + "]";
                        if (node == nullptr) throw std::runtime_error("Circular list is not closed");
                    }}
                    throw std::runtime_error("Circular list exceeds the walk bound");
                }}
                // Array-of-rings returns (LC 2674): an exact non-template
                // match, so the vector element serializes through the ring
                // walk above instead of decaying coderpuzzle_json(bool).
                static std::string coderpuzzle_result(const std::vector<ListNode*>& heads) {{
                    std::string output = "[";
                    for (size_t index = 0; index < heads.size(); ++index) {{
                        if (index) output += ',';
                        output += coderpuzzle_result(heads[index]);
                    }}
                    return output + "]";
                }}
                """
            )
        if "doubly_circular" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                // LC 426: left is prev, right is next; read the ring open
                // and verify every back-link on the way out. Reuses the
                // NodeWithNext decoder slot — a bundle uses one such kind.
                template <> struct CoderPuzzleDecoder<NodeWithNext*> {{
                    static NodeWithNext* read(CoderPuzzleReader& reader) {{
                        uint32_t length = reader.u32();
                        if (length == 0) return nullptr;
                        NodeWithNext* head = new NodeWithNext(CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                        NodeWithNext* tail = head;
                        for (uint32_t index = 1; index < length; ++index) {{
                            tail->right = new NodeWithNext(CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                            tail->right->left = tail;
                            tail = tail->right;
                        }}
                        return head;
                    }}
                }};
                static std::string coderpuzzle_result(NodeWithNext* head) {{
                    if (head == nullptr) return "[]";
                    std::string output = "[";
                    const NodeWithNext* previous = nullptr;
                    const NodeWithNext* node = head;
                    for (size_t bound = 0; bound < (1u << 20); ++bound) {{
                        // head's own back-link is the tail, verified when
                        // the walk closes below.
                        if (previous != nullptr && node->left != previous) {{
                            throw std::runtime_error("Doubly linked list is not properly linked");
                        }}
                        output += coderpuzzle_json(node->val);
                        previous = node;
                        node = node->right;
                        if (node == head) {{
                            if (head->left != previous) throw std::runtime_error("Doubly linked list is not properly linked");
                            return output + "]";
                        }}
                        if (node == nullptr) throw std::runtime_error("Doubly linked list is not closed");
                        output += ',';
                    }}
                    throw std::runtime_error("Doubly linked list exceeds the walk bound");
                }}
                """
            )
        if "multi_list" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                template <> struct CoderPuzzleDecoder<MultiListNode*> {{
                    static MultiListNode* read(CoderPuzzleReader& reader) {{ return readChain(reader); }}
                    // One chain: u32 n, then per node the value, a child
                    // flag, and the flagged child's own chain. Every chain
                    // (top and nested) gets its prev links set.
                    static MultiListNode* readChain(CoderPuzzleReader& reader) {{
                        uint32_t length = reader.u32();
                        MultiListNode* head = nullptr;
                        MultiListNode* tail = nullptr;
                        for (uint32_t index = 0; index < length; ++index) {{
                            MultiListNode* node = new MultiListNode(static_cast<int32_t>(reader.u32()));
                            if (tail != nullptr) {{
                                tail->next = node;
                                node->prev = tail;
                            }} else head = node;
                            tail = node;
                            if (reader.byte() == 1) node->child = readChain(reader);
                        }}
                        return head;
                    }}
                }};
                // A flattened result must be a clean doubly chain: every
                // prev back-link set, no child left.
                static std::string coderpuzzle_result(MultiListNode* head) {{
                    std::string output = "[";
                    const MultiListNode* node = head;
                    const MultiListNode* previous = nullptr;
                    for (size_t bound = 0; node != nullptr && bound < (1u << 20); ++bound) {{
                        if (node->prev != previous || node->child != nullptr) {{
                            throw std::runtime_error("Flattened list is not properly linked");
                        }}
                        if (node != head) output += ',';
                        output += coderpuzzle_json(node->val);
                        previous = node;
                        node = node->next;
                    }}
                    if (node != nullptr) throw std::runtime_error("Flattened list exceeds the walk bound");
                    return output + "]";
                }}
                """
            )
        if "graph" in structs:
            struct_codecs += textwrap.dedent(
                """
                template <> struct CoderPuzzleDecoder<Node*> {
                    static Node* read(CoderPuzzleReader& reader) {
                        uint32_t count = reader.u32();
                        if (count == 0) return nullptr;
                        std::vector<Node*> nodes;
                        nodes.reserve(count);
                        for (uint32_t index = 0; index < count; ++index) {
                            nodes.push_back(new Node(static_cast<int>(index) + 1));
                        }
                        for (uint32_t index = 0; index < count; ++index) {
                            uint32_t degree = reader.u32();
                            for (uint32_t neighbor = 0; neighbor < degree; ++neighbor) {
                                int value = static_cast<int32_t>(reader.u32()) + 1;
                                if (value < 1 || static_cast<uint32_t>(value) > count) {
                                    throw std::runtime_error("Graph neighbor is out of range");
                                }
                                nodes[index]->neighbors.push_back(nodes[static_cast<size_t>(value) - 1]);
                            }
                        }
                        return nodes[0];
                    }
                };
                static void coderpuzzleCollectInput(const Node* root) {
                    if (root == nullptr) return;
                    std::vector<const Node*> queue{root};
                    for (size_t index = 0; index < queue.size(); ++index) {
                        const Node* node = queue[index];
                        if (std::find(queue.begin(), queue.begin() + index, node) != queue.begin() + index) continue;
                        coderpuzzle_input_nodes.push_back(node);
                        for (const Node* neighbor : node->neighbors) queue.push_back(neighbor);
                    }
                }
                // Rows ordered by node value; neighbor order is normalized
                // (sorted) since LC treats adjacency order as irrelevant.
                static std::string coderpuzzle_result(Node* root) {
                    std::vector<const Node*> visited;
                    if (root != nullptr) {
                        std::vector<const Node*> queue{root};
                        for (size_t index = 0; index < queue.size(); ++index) {
                            const Node* node = queue[index];
                            if (std::find(queue.begin(), queue.begin() + index, node) != queue.begin() + index) continue;
                            visited.push_back(node);
                            for (const Node* neighbor : node->neighbors) queue.push_back(neighbor);
                        }
                    }
                    for (const Node* node : visited) {
                        if (std::find(coderpuzzle_input_nodes.begin(), coderpuzzle_input_nodes.end(), static_cast<const void*>(node)) != coderpuzzle_input_nodes.end()) {
                            throw std::runtime_error("Returned graph shares nodes with the input graph");
                        }
                    }
                    std::sort(visited.begin(), visited.end(), [](const Node* a, const Node* b) { return a->val < b->val; });
                    std::string output = "[";
                    for (size_t index = 0; index < visited.size(); ++index) {
                        if (index) output += ',';
                        std::vector<long long> neighbors;
                        for (const Node* neighbor : visited[index]->neighbors) {
                            neighbors.push_back(static_cast<long long>(neighbor->val));
                        }
                        std::sort(neighbors.begin(), neighbors.end());
                        output += '[';
                        for (size_t neighbor = 0; neighbor < neighbors.size(); ++neighbor) {
                            if (neighbor) output += ',';
                            output += std::to_string(neighbors[neighbor]);
                        }
                        output += ']';
                    }
                    return output + "]";
                }
                """
            ).replace("Node", graph_class)
        if "random_list" in structs:
            struct_codecs += textwrap.dedent(
                """
                template <> struct CoderPuzzleDecoder<Node*> {
                    static Node* read(CoderPuzzleReader& reader) {
                        uint32_t count = reader.u32();
                        if (count == 0) return nullptr;
                        std::vector<Node*> nodes;
                        std::vector<uint32_t> targets;
                        nodes.reserve(count);
                        // Each row carries [val, random] together.
                        for (uint32_t index = 0; index < count; ++index) {
                            nodes.push_back(new Node(static_cast<int32_t>(reader.u32())));
                            targets.push_back(reader.u32());
                        }
                        for (uint32_t index = 0; index + 1 < count; ++index) {
                            nodes[index]->next = nodes[index + 1];
                        }
                        for (uint32_t index = 0; index < count; ++index) {
                            if (targets[index] == 0xFFFFFFFFu) continue;
                            if (targets[index] >= count) throw std::runtime_error("Random pointer target is out of range");
                            nodes[index]->random = nodes[targets[index]];
                        }
                        return nodes[0];
                    }
                };
                static void coderpuzzleCollectInput(const Node* head) {
                    for (const Node* node = head; node; node = node->next) coderpuzzle_input_nodes.push_back(node);
                }
                static std::string coderpuzzle_result(Node* head) {
                    std::vector<const Node*> nodes;
                    for (const Node* node = head; node; node = node->next) {
                        if (std::find(nodes.begin(), nodes.end(), node) != nodes.end()) {
                            throw std::runtime_error("Random list has a cycle in next");
                        }
                        nodes.push_back(node);
                    }
                    for (const Node* node : nodes) {
                        if (std::find(coderpuzzle_input_nodes.begin(), coderpuzzle_input_nodes.end(), static_cast<const void*>(node)) != coderpuzzle_input_nodes.end()) {
                            throw std::runtime_error("Returned list shares nodes with the input list");
                        }
                    }
                    std::string output = "[";
                    for (size_t index = 0; index < nodes.size(); ++index) {
                        if (index) output += ',';
                        output += '[';
                        output += coderpuzzle_json(nodes[index]->val);
                        output += ',';
                        if (nodes[index]->random == nullptr) output += "null";
                        else {
                            auto target = std::find(nodes.begin(), nodes.end(), nodes[index]->random);
                            if (target == nodes.end()) {
                                throw std::runtime_error("Random pointer leaves the returned list");
                            }
                            output += std::to_string(static_cast<long long>(target - nodes.begin()));
                        }
                        output += ']';
                    }
                    return output + "]";
                }
                """
            ).replace("Node", random_class)
        if "doubly_list" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                template <> struct CoderPuzzleDecoder<{doubly_class}*> {{
                    static {doubly_class}* read(CoderPuzzleReader& reader) {{
                        if (reader.byte() == 0) return nullptr;
                        uint32_t length = reader.u32();
                        if (length == 0) return nullptr;
                        std::vector<{doubly_class}*> nodes;
                        nodes.reserve(length);
                        for (uint32_t index = 0; index < length; ++index) {{
                            nodes.push_back(new {doubly_class}(CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader)));
                        }}
                        // The chain is wired in both directions before the
                        // solution sees it.
                        for (uint32_t index = 0; index + 1 < length; ++index) {{
                            nodes[index]->next = nodes[index + 1];
                            nodes[index + 1]->prev = nodes[index];
                        }}
                        return nodes[0];
                    }}
                }};
                // The forward walk must agree with every back-link — the
                // open chain's answer to the circular walk's closure check.
                static std::string coderpuzzle_result({doubly_class}* head) {{
                    std::string output = "[";
                    const {doubly_class}* node = head;
                    const {doubly_class}* previous = nullptr;
                    for (size_t bound = 0; node != nullptr && bound < (1u << 20); ++bound) {{
                        if (node->prev != previous) {{
                            throw std::runtime_error("Doubly linked list is not properly linked");
                        }}
                        if (node != head) output += ',';
                        output += coderpuzzle_json(node->val);
                        previous = node;
                        node = node->next;
                    }}
                    if (node != nullptr) throw std::runtime_error("Doubly linked list exceeds the walk bound");
                    return output + "]";
                }}
                """
            )
        if "doubly_list_node" in structs:
            # Same wire as doubly_list plus one trailing value naming the
            # chain node the method receives; a bundle uses one list kind.
            struct_codecs += textwrap.dedent(
                f"""
                template <> struct CoderPuzzleDecoder<{doubly_node_class}*> {{
                    static {doubly_node_class}* read(CoderPuzzleReader& reader) {{
                        if (reader.byte() == 0) return nullptr;
                        uint32_t length = reader.u32();
                        {doubly_node_class}* head = nullptr;
                        if (length > 0) {{
                            std::vector<{doubly_node_class}*> nodes;
                            nodes.reserve(length);
                            for (uint32_t index = 0; index < length; ++index) {{
                                nodes.push_back(new {doubly_node_class}(CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader)));
                            }}
                            for (uint32_t index = 0; index + 1 < length; ++index) {{
                                nodes[index]->next = nodes[index + 1];
                                nodes[index + 1]->prev = nodes[index];
                            }}
                            head = nodes[0];
                        }}
                        auto target = CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader);
                        for ({doubly_node_class}* node = head; node != nullptr; node = node->next) {{
                            if (node->val == target) return node;
                        }}
                        throw std::runtime_error("doubly_list_node target value is not in the chain");
                    }}
                }};
                static std::string coderpuzzle_result({doubly_node_class}* head) {{
                    std::string output = "[";
                    const {doubly_node_class}* node = head;
                    const {doubly_node_class}* previous = nullptr;
                    for (size_t bound = 0; node != nullptr && bound < (1u << 20); ++bound) {{
                        if (node->prev != previous) {{
                            throw std::runtime_error("Doubly linked list is not properly linked");
                        }}
                        if (node != head) output += ',';
                        output += coderpuzzle_json(node->val);
                        previous = node;
                        node = node->next;
                    }}
                    if (node != nullptr) throw std::runtime_error("Doubly linked list exceeds the walk bound");
                    return output + "]";
                }}
                """
            )
        if "random_tree" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                template <> struct CoderPuzzleDecoder<{random_tree_class}*> {{
                    static {random_tree_class}* read(CoderPuzzleReader& reader) {{
                        // Binary-tree level order whose present slots carry
                        // [val, randomIndex] rows; the index counts present
                        // nodes in level order, from the root.
                        uint32_t count = reader.u32();
                        if (count == 0) return nullptr;
                        if (reader.byte() == 0) throw std::runtime_error("random_tree root must be a [val, random] row");
                        {random_tree_class}* root = new {random_tree_class}(CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                        std::vector<{random_tree_class}*> order{{root}};
                        std::vector<std::pair<{random_tree_class}*, uint32_t>> pending;
                        pending.emplace_back(root, reader.u32());
                        std::deque<{random_tree_class}*> queue{{root}};
                        size_t index = 1;
                        while (!queue.empty() && index < count) {{
                            {random_tree_class}* node = queue.front();
                            queue.pop_front();
                            for ({random_tree_class}** side : {{&node->left, &node->right}}) {{
                                if (index >= count) break;
                                ++index;
                                if (reader.byte() == 0) continue;
                                {random_tree_class}* child = new {random_tree_class}(CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                                pending.emplace_back(child, reader.u32());
                                *side = child;
                                order.push_back(child);
                                queue.push_back(child);
                            }}
                        }}
                        for (const auto& [node, target] : pending) {{
                            if (target == 0xFFFFFFFFu) continue;
                            if (target >= order.size()) throw std::runtime_error("Random pointer target is out of range");
                            node->random = order[target];
                        }}
                        return root;
                    }}
                }};
                static void coderpuzzleCollectInput(const {random_tree_class}* root) {{
                    if (root == nullptr) return;
                    std::vector<const {random_tree_class}*> queue{{root}};
                    for (size_t index = 0; index < queue.size(); ++index) {{
                        const {random_tree_class}* node = queue[index];
                        if (node == nullptr) continue;
                        if (std::find(queue.begin(), queue.begin() + index, node) != queue.begin() + index) continue;
                        coderpuzzle_input_nodes.push_back(node);
                        queue.push_back(node->left);
                        queue.push_back(node->right);
                    }}
                }}
                // Level order rows like the input side, with null
                // placeholders for absent slots and trailing nulls trimmed.
                // Random indices address present nodes in level order — the
                // same numbering the decode side uses — so placeholder
                // slots shift nothing and are never dereferenced. The clone
                // check forbids returning (part of) the input tree, and
                // every random pointer must land inside the returned tree.
                static std::string coderpuzzle_result({random_tree_class}* root) {{
                    std::vector<const {random_tree_class}*> order;
                    std::vector<std::string> values;
                    if (root != nullptr) {{
                        std::deque<const {random_tree_class}*> queue{{root}};
                        while (!queue.empty()) {{
                            const {random_tree_class}* node = queue.front();
                            queue.pop_front();
                            if (node == nullptr) {{
                                order.push_back(nullptr);
                                values.push_back("null");
                                continue;
                            }}
                            if (std::find(order.begin(), order.end(), node) != order.end()) {{
                                throw std::runtime_error("Random tree repeats a node in level order");
                            }}
                            order.push_back(node);
                            values.push_back(coderpuzzle_json(node->val));
                            queue.push_back(node->left);
                            queue.push_back(node->right);
                        }}
                    }}
                    while (!values.empty() && values.back() == "null") {{
                        values.pop_back();
                        order.pop_back();
                    }}
                    for (const {random_tree_class}* node : order) {{
                        if (node != nullptr && std::find(coderpuzzle_input_nodes.begin(), coderpuzzle_input_nodes.end(), static_cast<const void*>(node)) != coderpuzzle_input_nodes.end()) {{
                            throw std::runtime_error("Returned tree shares nodes with the input tree");
                        }}
                    }}
                    std::vector<const {random_tree_class}*> present;
                    for (const {random_tree_class}* node : order) {{
                        if (node != nullptr) present.push_back(node);
                    }}
                    std::string output = "[";
                    for (size_t index = 0; index < order.size(); ++index) {{
                        if (index) output += ',';
                        if (order[index] == nullptr) {{
                            output += "null";
                            continue;
                        }}
                        output += '[';
                        output += values[index];
                        output += ',';
                        const {random_tree_class}* target = order[index]->random;
                        if (target == nullptr) {{
                            output += "null";
                        }} else {{
                            auto found = std::find(present.begin(), present.end(), target);
                            if (found == present.end()) throw std::runtime_error("Random pointer leaves the returned tree");
                            output += std::to_string(static_cast<long long>(found - present.begin()));
                        }}
                        output += ']';
                    }}
                    return output + "]";
                }}
                """
            )
        if "special_tree" in structs:
            # The display wire is the plain binary-tree one; the special
            # property is wired here. Reuses the TreeNode decoder slot — a
            # bundle uses one binary-tree kind.
            struct_codecs += textwrap.dedent(
                f"""
                template <> struct CoderPuzzleDecoder<TreeNode*> {{
                    static TreeNode* read(CoderPuzzleReader& reader) {{
                        uint32_t length = reader.u32();
                        std::vector<std::pair<bool, {cpp_type(item_spec)}>> slots;
                        slots.reserve(length);
                        for (uint32_t index = 0; index < length; ++index) {{
                            if (reader.byte() == 1) slots.emplace_back(true, CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                            else slots.emplace_back(false, {cpp_type(item_spec)}());
                        }}
                        if (length == 0 || !slots[0].first) return nullptr;
                        TreeNode* root = new TreeNode(slots[0].second);
                        std::deque<TreeNode*> queue{{root}};
                        size_t index = 1;
                        while (!queue.empty() && index < slots.size()) {{
                            TreeNode* node = queue.front();
                            queue.pop_front();
                            if (index < slots.size()) {{
                                if (slots[index].first) {{
                                    node->left = new TreeNode(slots[index].second);
                                    queue.push_back(node->left);
                                }}
                                ++index;
                            }}
                            if (index < slots.size()) {{
                                if (slots[index].first) {{
                                    node->right = new TreeNode(slots[index].second);
                                    queue.push_back(node->right);
                                }}
                                ++index;
                            }}
                        }}
                        // LC 2773: the leaves b1..bk in increasing value
                        // order are ring-wired left to the previous and
                        // right to the next leaf (a lone leaf loops on
                        // itself).
                        std::vector<TreeNode*> leaves;
                        std::deque<TreeNode*> pending{{root}};
                        while (!pending.empty()) {{
                            TreeNode* node = pending.front();
                            pending.pop_front();
                            if (node->left == nullptr && node->right == nullptr) leaves.push_back(node);
                            else {{
                                if (node->left != nullptr) pending.push_back(node->left);
                                if (node->right != nullptr) pending.push_back(node->right);
                            }}
                        }}
                        std::stable_sort(leaves.begin(), leaves.end(), [](const TreeNode* a, const TreeNode* b) {{ return a->val < b->val; }});
                        size_t count = leaves.size();
                        for (size_t index = 0; index < count; ++index) {{
                            leaves[index]->left = leaves[(index + count - 1) % count];
                            leaves[index]->right = leaves[(index + 1) % count];
                        }}
                        return root;
                    }}
                }};
                """
            )
        if "nary_tree_nodes" in structs:
            # The display wire is the plain n-ary one; the handover is the
            # decoded tree's node list (level order — the statement grants
            # an arbitrary permutation).
            struct_codecs += textwrap.dedent(
                """
                template <> struct CoderPuzzleDecoder<std::vector<Node*>> {
                    static std::vector<Node*> read(CoderPuzzleReader& reader) {
                        Node* root = CoderPuzzleDecoder<Node*>::read(reader);
                        std::vector<Node*> nodes;
                        if (root == nullptr) return nodes;
                        std::deque<Node*> queue{root};
                        while (!queue.empty()) {
                            Node* node = queue.front();
                            queue.pop_front();
                            nodes.push_back(node);
                            for (Node* child : node->children) queue.push_back(child);
                        }
                        return nodes;
                    }
                };
                """
            )
        if "alias_list" in structs:
            struct_codecs += textwrap.dedent(
                """
                // LC 160: the intersection is by identity — the result
                // must be a node taken from the input lists, and the wire
                // is the shared tail's values.
                static std::string coderpuzzle_result(ListNode* node) {
                    if (node == nullptr) return "[]";
                    if (std::find(coderpuzzle_input_nodes.begin(), coderpuzzle_input_nodes.end(), static_cast<const void*>(node)) == coderpuzzle_input_nodes.end()) {
                        throw std::runtime_error("Returned node is not part of the input lists");
                    }
                    std::string output = "[";
                    bool first = true;
                    for (const ListNode* walk = node; walk; walk = walk->next) {
                        if (!first) output += ',';
                        first = false;
                        output += coderpuzzle_json(walk->val);
                    }
                    return output + "]";
                }
                """
            )
        pending_specs = dict(struct_specs)
        while pending_specs:
            # Cyclic struct references (a manifest author's bug) would spin
            # here forever with no timeout covering prepare — fail loudly
            # when a full pass emits nothing.
            emitted = False
            for name, spec in sorted(pending_specs.items()):
                fields = spec.get("fields") or []
                if any(
                    isinstance(field.get("value_type"), dict)
                    and field["value_type"].get("kind") == "struct"
                    and field["value_type"].get("class") in pending_specs
                    for field in fields
                ):
                    continue  # emit referenced structs first
                reads = ", ".join(
                    f"CoderPuzzleDecoder<{cpp_type(field['value_type'])}>::read(reader)"
                    for field in fields
                )
                struct_codecs += textwrap.dedent(
                    f"""
                    template <> struct CoderPuzzleDecoder<{name}> {{
                        static {name} read(CoderPuzzleReader& reader) {{
                            return {name}({reads});
                        }}
                    }};
                    """
                )
                del pending_specs[name]
                emitted = True
                break
            if not emitted:
                cyclic = ", ".join(sorted(pending_specs))
                raise ExecutorError(f"Struct references form a cycle: {cyclic}")

        if "tree" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                template <> struct CoderPuzzleDecoder<TreeNode*> {{
                    static TreeNode* read(CoderPuzzleReader& reader) {{
                        uint32_t length = reader.u32();
                        std::vector<std::pair<bool, {cpp_type(item_spec)}>> slots;
                        slots.reserve(length);
                        for (uint32_t index = 0; index < length; ++index) {{
                            if (reader.byte() == 1) slots.emplace_back(true, CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(reader));
                            else slots.emplace_back(false, {cpp_type(item_spec)}());
                        }}
                        if (length == 0 || !slots[0].first) return nullptr;
                        TreeNode* root = new TreeNode(slots[0].second);
                        std::deque<TreeNode*> queue{{root}};
                        size_t index = 1;
                        while (!queue.empty() && index < slots.size()) {{
                            TreeNode* node = queue.front();
                            queue.pop_front();
                            if (index < slots.size()) {{
                                if (slots[index].first) {{
                                    node->left = new TreeNode(slots[index].second);
                                    queue.push_back(node->left);
                                }}
                                ++index;
                            }}
                            if (index < slots.size()) {{
                                if (slots[index].first) {{
                                    node->right = new TreeNode(slots[index].second);
                                    queue.push_back(node->right);
                                }}
                                ++index;
                            }}
                        }}
                        return root;
                    }}
                }};
                static std::string coderpuzzle_json(const TreeNode* root) {{
                    std::vector<std::string> items;
                    std::deque<const TreeNode*> queue;
                    if (root) queue.push_back(root);
                    while (!queue.empty()) {{
                        const TreeNode* node = queue.front();
                        queue.pop_front();
                        if (node == nullptr) {{
                            items.push_back("null");
                            continue;
                        }}
                        items.push_back(coderpuzzle_json(node->val));
                        queue.push_back(node->left);
                        queue.push_back(node->right);
                    }}
                    while (!items.empty() && items.back() == "null") items.pop_back();
                    std::string output = "[";
                    for (size_t index = 0; index < items.size(); ++index) {{
                        if (index) output += ',';
                        output += items[index];
                    }}
                    return output + "]";
                }}
                """
            )

        # Alias splices need the aliased list's node addresses, and clone
        # checks need every input node registered — read the parameters with
        # that bookkeeping inline.
        alias_sources = sorted(
            {
                spec["alias"]
                for spec in parameters
                if spec.get("kind") == "alias_list"
            }
        )

        def declaration(index: int, spec: dict[str, Any]) -> str:
            kind = spec.get("kind")
            if kind == "alias_list":
                lines = [
                    f"auto coderpuzzle_arg_{index} = [&]() -> ListNode* {{",
                    "            uint32_t count = coderpuzzle_reader.u32();",
                    "            ListNode* head = nullptr;",
                    "            ListNode** cursor = &head;",
                    "            std::vector<ListNode*> prefix;",
                    "            for (uint32_t step = 0; step < count; ++step) {",
                    f"                *cursor = new ListNode(CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(coderpuzzle_reader));",
                    "                prefix.push_back(*cursor);",
                    "                cursor = &((*cursor)->next);",
                    "            }",
                    "            uint32_t splice_at = coderpuzzle_reader.u32();",
                    f"            if (splice_at < coderpuzzle_arg_{spec['alias']}_nodes.size()) {{",
                    f"                *cursor = coderpuzzle_arg_{spec['alias']}_nodes[splice_at];",
                    "            }",
                    "            for (const ListNode* node : prefix) coderpuzzle_input_nodes.push_back(node);",
                    "            return head;",
                    "        }();",
                ]
                return "\n".join(" " * 20 + line for line in lines)
            if kind == "nary_tree_ref":
                # The value names a node of the already-decoded aliased
                # tree; the argument is that exact node (shared identity).
                lines = [
                    f"auto coderpuzzle_arg_{index} = [&]() -> Node* {{",
                    f"            auto named = CoderPuzzleDecoder<{cpp_type(item_spec)}>::read(coderpuzzle_reader);",
                    f"            Node* found = coderpuzzleFindNaryNode(coderpuzzle_arg_{spec['alias']}, named);",
                    '            if (found == nullptr) throw std::runtime_error("nary_tree_ref target value is not in the aliased tree");',
                    "            return found;",
                    "        }();",
                ]
                return "\n".join(" " * 20 + line for line in lines)
            lines = [f"auto coderpuzzle_arg_{index} = CoderPuzzleDecoder<{cpp_type(spec)}>::read(coderpuzzle_reader);"]
            if kind == "linked_list" and index in alias_sources:
                lines.append(
                    f"std::vector<ListNode*> coderpuzzle_arg_{index}_nodes;"
                    f" for (ListNode* node = coderpuzzle_arg_{index}; node; node = node->next) coderpuzzle_arg_{index}_nodes.push_back(node);"
                )
            if kind in {"linked_list", "graph", "random_list", "random_tree"}:
                lines.append(f"coderpuzzleCollectInput(coderpuzzle_arg_{index});")
            return "\n".join(" " * 20 + line for line in lines)

        declarations = "\n".join(
            declaration(index, spec) for index, spec in enumerate(parameters)
        )
        arguments = ", ".join(f"coderpuzzle_arg_{index}" for index in range(len(parameters)))
        wrapper = textwrap.dedent(
            f"""
            #undef main
            #undef int

            class CoderPuzzleReader {{
            public:
                explicit CoderPuzzleReader(std::vector<unsigned char> bytes) : data(std::move(bytes)) {{}}
                uint32_t u32() {{
                    require(4);
                    uint32_t value = 0;
                    for (int i = 0; i < 4; ++i) value = (value << 8) | data[offset++];
                    return value;
                }}
                uint64_t u64() {{
                    require(8);
                    uint64_t value = 0;
                    for (int i = 0; i < 8; ++i) value = (value << 8) | data[offset++];
                    return value;
                }}
                unsigned char byte() {{ require(1); return data[offset++]; }}
                std::string text() {{
                    uint32_t length = u32();
                    require(length);
                    std::string value(data.begin() + offset, data.begin() + offset + length);
                    offset += length;
                    return value;
                }}
                void finished() const {{
                    if (offset != data.size()) throw std::runtime_error("Trailing judge input");
                }}
            private:
                std::vector<unsigned char> data;
                size_t offset = 0;
                void require(size_t count) const {{
                    if (count > data.size() - offset) throw std::runtime_error("Truncated judge input");
                }}
            }};

            template <typename T> struct CoderPuzzleDecoder;
            template <> struct CoderPuzzleDecoder<int> {{
                static int read(CoderPuzzleReader& reader) {{ return static_cast<int32_t>(reader.u32()); }}
            }};
            template <> struct CoderPuzzleDecoder<long long> {{
                static long long read(CoderPuzzleReader& reader) {{ return static_cast<int64_t>(reader.u64()); }}
            }};
            template <> struct CoderPuzzleDecoder<double> {{
                static double read(CoderPuzzleReader& reader) {{
                    uint64_t bits = reader.u64();
                    double value;
                    std::memcpy(&value, &bits, sizeof(value));
                    return value;
                }}
            }};
            template <> struct CoderPuzzleDecoder<bool> {{
                static bool read(CoderPuzzleReader& reader) {{
                    auto value = reader.byte();
                    if (value > 1) throw std::runtime_error("Invalid boolean input");
                    return value == 1;
                }}
            }};
            template <> struct CoderPuzzleDecoder<std::string> {{
                static std::string read(CoderPuzzleReader& reader) {{ return reader.text(); }}
            }};
            template <typename T> struct CoderPuzzleDecoder<std::vector<T>> {{
                static std::vector<T> read(CoderPuzzleReader& reader) {{
                    uint32_t length = reader.u32();
                    std::vector<T> values;
                    values.reserve(length);
                    for (uint32_t index = 0; index < length; ++index) {{
                        values.push_back(CoderPuzzleDecoder<T>::read(reader));
                    }}
                    return values;
                }}
            }};

            static std::string coderpuzzle_json(const std::string& value) {{
                static const char* hex = "0123456789abcdef";
                std::string output = "\\\"";
                for (unsigned char character : value) {{
                    switch (character) {{
                        case '\\"': output += "\\\\\\\""; break;
                        case '\\\\': output += "\\\\\\\\"; break;
                        case '\\b': output += "\\\\b"; break;
                        case '\\f': output += "\\\\f"; break;
                        case '\\n': output += "\\\\n"; break;
                        case '\\r': output += "\\\\r"; break;
                        case '\\t': output += "\\\\t"; break;
                        default:
                            if (character < 0x20) {{
                                output += "\\\\u00";
                                output += hex[character >> 4];
                                output += hex[character & 15];
                            }} else output += static_cast<char>(character);
                    }}
                }}
                return output + "\\\"";
            }}
            static std::string coderpuzzle_json(bool value) {{ return value ? "true" : "false"; }}
            static std::string coderpuzzle_json(int value) {{ return std::to_string(value); }}
            static std::string coderpuzzle_json(long long value) {{ return std::to_string(value); }}
            static std::string coderpuzzle_json(double value) {{
                if (!std::isfinite(value)) throw std::runtime_error("Non-finite return value");
                std::ostringstream output;
                output << std::setprecision(17) << value;
                return output.str();
            }}
            template <typename T> static std::string coderpuzzle_json(const std::vector<T>& values) {{
                std::string output = "[";
                for (size_t index = 0; index < values.size(); ++index) {{
                    if (index) output += ',';
                    output += coderpuzzle_json(values[index]);
                }}
                return output + "]";
            }}
{struct_codecs}
            template <typename T> static std::string coderpuzzle_result(const T& value) {{
                return coderpuzzle_json(value);
            }}

            int main() {{
                try {{
                    std::vector<unsigned char> bytes{{
                        std::istreambuf_iterator<char>(std::cin), std::istreambuf_iterator<char>()
                    }};
                    CoderPuzzleReader coderpuzzle_reader(std::move(bytes));
{declarations}
                    coderpuzzle_reader.finished();
                    {class_name} coderpuzzle_solution;
                    auto coderpuzzle_actual = coderpuzzle_solution.{method}({arguments});
                    coderpuzzleEmit("__CODERPUZZLE_RESULT__{{\\\"status\\\":\\\"completed\\\",\\\"actual\\\":\" + coderpuzzle_result(coderpuzzle_actual) + \"}}\");
                }} catch (const std::exception& error) {{
                    coderpuzzleEmit("__CODERPUZZLE_RESULT__{{\\\"status\\\":\\\"runtime_error\\\",\\\"error\\\":\" + coderpuzzle_json(std::string(error.what())) + \"}}\");
                }} catch (...) {{
                    coderpuzzleEmit("__CODERPUZZLE_RESULT__{{\\\"status\\\":\\\"runtime_error\\\",\\\"error\\\":\\\"Unknown C++ exception\\\"}}\");
                }}
                return 0;
            }}
            """
        )
        source_path = job_root / "main.cpp"
        executable = job_root / "solution"
        source_path.write_text(
            "#include <bits/stdc++.h>\n"
            "#include <unistd.h>\n"
            "using namespace std;\n"
            "\n"
            "// The last valid protocol line wins and is JSON-validated; the fd\n"
            "// keeps ordinary stdout noise out of the channel, but the submission\n"
            "// inherits it too — an accepted result must still carry matching output.\n"
            "void coderpuzzleEmit(const std::string& line) {\n"
            "    std::string payload = line + \"\\n\";\n"
            "    if (::write(63, payload.data(), payload.size()) < 0) {\n"
            "        std::cout << payload << std::flush;\n"
            "    }\n"
            "}\n"
            + assembly_decls
            + code
            + "\n"
            + wrapper,
            encoding="utf-8",
        )
        source_path.chmod(0o444)
        self.compile(
            job_root,
            (
                self.compiler_path,
                "-std=c++20",
                "-O2",
                "-pipe",
                "-fno-diagnostics-color",
                "-o",
                str(executable),
                str(source_path),
            ),
            executable,
            {"PATH": "/usr/bin:/bin", "HOME": "/nonexistent", "LANG": "C.UTF-8"},
        )
        return PreparedProgram(
            command=(str(executable),),
            environment={
                "PATH": "/usr/bin:/bin",
                "HOME": "/nonexistent",
                "TMPDIR": str(scratch),
            },
        )

    def encode_case(self, invocation: dict[str, Any], case_input: Any) -> bytes:
        if invocation.get("type") == "interactive":
            from .typed import encode_interactive_case
            return encode_interactive_case(invocation, case_input)
        if invocation.get("type") == "design":
            from .design_interactive import encode_design_case
            return encode_design_case(invocation, case_input)
        return encode_case(invocation, case_input, self.language)
