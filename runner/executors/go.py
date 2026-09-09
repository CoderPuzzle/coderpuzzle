import re
import textwrap
from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram
from .compiled import CompiledExecutor
from .typed import (
    encode_case,
    function_signature,
    go_type,
    provided_node_class,
    struct_item_spec,
    uses_struct_kinds,
)

# Submitted code may import stdlib packages; Go requires every import to sit
# in the file's import preamble, so user imports are lifted out of the code
# and merged with the wrapper's own.
GO_IMPORT_BLOCK = re.compile(
    r'^import \((?:\s*"[^"]+"\s*)+\)\s*\n|^import\s+"[^"]+"\s*\n', re.M
)
WRAPPER_IMPORTS = ("encoding/binary", "encoding/json", "fmt", "io", "math", "os")

# Reader method per value_type kind; struct kinds read through a method
# named after the class. The assembled program is kept gofmt-canonical, so
# every emitted block is written with 4-space indents and expanded to tabs.
READER_METHODS = {
    "linked_list": "linkedList",
    "binary_tree": "tree",
    "nary_tree": "naryTree",
    "quad_tree": "quadTree",
    "nested": "nestedInteger",
    "next_tree": "nextTree",
    "circular_list": "circularList",
    "doubly_circular": "doublyCircular",
    "multi_list": "multiList",
    "graph": "graph",
    "random_list": "randomList",
    "doubly_list": "doublyList",
    "doubly_list_node": "doublyListNode",
    "random_tree": "randomTree",
    "special_tree": "specialTree",
    "nary_tree_nodes": "naryTreeNodes",
    # nary_tree_ref reads inline in coderpuzzleExecute like alias_list: the
    # value names a node inside an earlier parameter's decoded tree.
}
# Kinds that use the same bundle-provided node class: these aliases tie
# ListNode/NodeWithNext codec paths to every wire kind that needs each shape.


def _tabs(text: str) -> str:
    """Expand leading 4-space indents to the tabs gofmt expects."""
    lines = []
    for line in text.splitlines():
        width = len(line) - len(line.lstrip(" "))
        lines.append("\t" * (width // 4) + " " * (width % 4) + line[width:])
    return "\n".join(lines)


def _merge_imports(code: str, extra: tuple[str, ...] = ()) -> tuple[str, str]:
    packages = set(WRAPPER_IMPORTS) | set(extra)
    remaining = code
    for match in GO_IMPORT_BLOCK.finditer(code):
        packages.update(re.findall(r'"([^"]+)"', match.group(0)))
        remaining = remaining.replace(match.group(0), "", 1)
    imports = "".join(f'\t"{package}"\n' for package in sorted(packages))
    return remaining.strip("\n"), imports


def _read_expression(spec: dict[str, Any], reader: str = "coderpuzzleReader") -> str:
    kind = spec["kind"]
    if kind == "json":
        # Same rejection go_type renders for the type: the generic any
        # value is a JavaScript/TypeScript kind.
        raise ExecutorError("json values are supported in JavaScript and TypeScript only")
    if kind in READER_METHODS:
        return f"{reader}.{READER_METHODS[kind]}()"
    if kind == "struct":
        # The class is the using problem's provided/ source; the reader
        # carries a same-named codec method for it.
        return f"{reader}.{spec['class']}()"
    if kind == "integer":
        return f"{reader}.int32()" if spec.get("bits", 32) == 32 else f"{reader}.int64()"
    if kind == "number":
        return f"{reader}.number()"
    if kind == "boolean":
        return f"{reader}.boolean()"
    if kind == "string":
        return f"{reader}.text()"
    item_type = go_type(spec["items"])
    nested = _read_expression(spec["items"], "reader")
    return f"coderpuzzleArray({reader}, func(reader *coderpuzzleReaderType) {item_type} {{ return {nested} }})"


class GoExecutor(CompiledExecutor):
    language = "go"
    # Go reserves a large virtual arena while resident memory remains bounded
    # by GOMEMLIMIT and the container cgroup.
    address_space_overhead_mb = 2048
    max_processes = 32
    compiler_memory_mb = 2048
    # A cold GOCACHE (fresh container, or stdlib packages the warm build does
    # not cover) makes `go build` compile standard-library packages on the
    # spot — 10s is not enough on a small VM. Compile time is wall clock
    # outside the judged runtime, so the generous budget costs nothing.
    compiler_timeout_seconds = 60
    compiler_path = "/usr/bin/go"
    benchmark_command = ("/runner/benchmarks/go",)
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
        if invocation.get("type") == "design":
            from .go_design import prepare_design
            return prepare_design(self, job_root, scratch, code, invocation, assembly)
        if invocation.get("type") == "interactive":
            from .go_interactive import prepare_interactive
            return prepare_interactive(self, job_root, scratch, code, invocation, assembly)
        parameters, return_type, method = function_signature(invocation, self.language)
        structs = uses_struct_kinds(invocation)
        # Graph and random_list nodes are the using problem's provided/
        # class (LC 133/138 ship their own); the readers, collectors, and
        # serializers below render around that name. The open doubly
        # chains (LC 3263/3294) and the random-pointer tree (LC 1485) are
        # provided classes the same way.
        graph_class = provided_node_class(invocation, "graph")
        random_class = provided_node_class(invocation, "random_list")
        doubly_class = provided_node_class(invocation, "doubly_list")
        doubly_node_class = provided_node_class(invocation, "doubly_list_node")
        random_tree_class = provided_node_class(invocation, "random_tree")
        item_type = go_type(struct_item_spec(invocation))
        item_expression = _read_expression(struct_item_spec(invocation), "reader")
        # The assembled program compiles as one package: the problem's own
        # provided/ sources (every well-known structure a bundle's wire
        # needs — docs/CODECS.md) land beside main.go as their own files
        # (each already declares `package main`).
        assembly_paths = []
        for name, content in sorted((assembly or {}).get("provided", {}).items()):
            if not name.endswith(".go"):
                continue
            part_path = job_root / f"provided_{name}"
            part_path.write_text(content, encoding="utf-8")
            part_path.chmod(0o444)
            assembly_paths.append(str(part_path))
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
        # definition of its own. struct_codecs below generates only the
        # WIRE CODECS (reader methods, JSON conversion), which reference
        # these types by name and compile against whatever the assembly
        # provides.
        struct_codecs = ""
        result_conversion = "coderpuzzleIdentity"
        if "list" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                func (reader *coderpuzzleReaderType) linkedList() *ListNode {{
                    if reader.take(1)[0] == 0 {{ return nil }}
                    length := int(reader.uint32())
                    var head, current *ListNode
                    for index := 0; index < length; index++ {{
                        node := &ListNode{{Val: {item_expression}}}
                        if current == nil {{ head = node }} else {{ current.Next = node }}
                        current = node
                    }}
                    return head
                }}
                func coderpuzzleCollectList(head *ListNode) {{
                    for node := head; node != nil; node = node.Next {{
                        coderpuzzleInputNodes = append(coderpuzzleInputNodes, node)
                    }}
                }}
                func coderpuzzleListNodeJSON(head *ListNode) []any {{
                    values := []any{{}}
                    for node := head; node != nil; node = node.Next {{
                        values = append(values, node.Val)
                    }}
                    return values
                }}
                func coderpuzzleListNodeArrayJSON(heads []*ListNode) []any {{
                    return coderpuzzleArrayOfMapped(heads, coderpuzzleListNodeJSON)
                }}
                """
            )
            if return_type.get("kind") == "linked_list":
                result_conversion = "coderpuzzleListNodeJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "linked_list"):
                result_conversion = "coderpuzzleListNodeArrayJSON"
        # special_tree rides the plain binary-tree display; its reader
        # reuses tree() below and adds the leaf-ring wiring.
        if structs & {"tree", "special_tree"}:
            struct_codecs += textwrap.dedent(
                f"""
                func (reader *coderpuzzleReaderType) tree() *TreeNode {{
                    length := int(reader.uint32())
                    type slot struct {{
                        present bool
                        value   {item_type}
                    }}
                    slots := make([]slot, length)
                    for index := 0; index < length; index++ {{
                        if reader.take(1)[0] == 1 {{
                            slots[index] = slot{{present: true, value: {item_expression}}}
                        }}
                    }}
                    if length == 0 || !slots[0].present {{ return nil }}
                    root := &TreeNode{{Val: slots[0].value}}
                    queue := []*TreeNode{{root}}
                    index := 1
                    for len(queue) > 0 && index < length {{
                        node := queue[0]
                        queue = queue[1:]
                        if index < length {{
                            if slots[index].present {{
                                node.Left = &TreeNode{{Val: slots[index].value}}
                                queue = append(queue, node.Left)
                            }}
                            index++
                        }}
                        if index < length {{
                            if slots[index].present {{
                                node.Right = &TreeNode{{Val: slots[index].value}}
                                queue = append(queue, node.Right)
                            }}
                            index++
                        }}
                    }}
                    return root
                }}
                func coderpuzzleTreeNodeJSON(root *TreeNode) []any {{
                    if root == nil {{ return []any{{}} }}
                    values := []any{{}}
                    queue := []*TreeNode{{root}}
                    for len(queue) > 0 {{
                        node := queue[0]
                        queue = queue[1:]
                        if node == nil {{
                            values = append(values, nil)
                            continue
                        }}
                        values = append(values, node.Val)
                        queue = append(queue, node.Left, node.Right)
                    }}
                    for len(values) > 0 && values[len(values)-1] == nil {{
                        values = values[:len(values)-1]
                    }}
                    return values
                }}
                func coderpuzzleTreeNodeArrayJSON(roots []*TreeNode) []any {{
                    return coderpuzzleArrayOfMapped(roots, coderpuzzleTreeNodeJSON)
                }}
                """
            )
            if return_type.get("kind") == "binary_tree":
                result_conversion = "coderpuzzleTreeNodeJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "binary_tree"):
                result_conversion = "coderpuzzleTreeNodeArrayJSON"
        # nary_tree_nodes and nary_tree_ref ride the n-ary display too:
        # the nodes reader and the inline ref resolver below both decode
        # through naryTree().
        if structs & {"nary_tree", "nary_tree_nodes", "nary_tree_ref"}:
            struct_codecs += textwrap.dedent(
                f"""
                func (reader *coderpuzzleReaderType) naryTree() *Node {{
                    length := int(reader.uint32())
                    type slot struct {{
                        present bool
                        value   {item_type}
                    }}
                    slots := make([]slot, length)
                    for index := 0; index < length; index++ {{
                        if reader.take(1)[0] == 1 {{
                            slots[index] = slot{{present: true, value: {item_expression}}}
                        }}
                    }}
                    if length == 0 || !slots[0].present {{ return nil }}
                    root := &Node{{Val: slots[0].value}}
                    queue := []*Node{{root}}
                    // Display wire: slot 1 closes the root group, then every
                    // node's children run until that node's own separator
                    // slot. Tolerate the marker's absence for hand-written
                    // inputs.
                    index := 2
                    if length > 1 && slots[1].present {{ index = 1 }}
                    for len(queue) > 0 && index < length {{
                        node := queue[0]
                        queue = queue[1:]
                        for index < length && slots[index].present {{
                            child := &Node{{Val: slots[index].value}}
                            node.Children = append(node.Children, child)
                            queue = append(queue, child)
                            index++
                        }}
                        if index < length {{ index++ }}  // group separator
                    }}
                    return root
                }}
                // Display wire: root value, the marker closing the root
                // group, then each node's children followed by its own
                // marker; trailing markers are trimmed.
                func coderpuzzleNodeJSON(root *Node) []any {{
                    if root == nil {{ return []any{{}} }}
                    values := []any{{root.Val, nil}}
                    queue := []*Node{{root}}
                    for len(queue) > 0 {{
                        node := queue[0]
                        queue = queue[1:]
                        for _, child := range node.Children {{
                            values = append(values, child.Val)
                            queue = append(queue, child)
                        }}
                        values = append(values, nil)
                    }}
                    for len(values) > 0 && values[len(values)-1] == nil {{
                        values = values[:len(values)-1]
                    }}
                    return values
                }}
                func coderpuzzleNodeArrayJSON(roots []*Node) []any {{
                    return coderpuzzleArrayOfMapped(roots, coderpuzzleNodeJSON)
                }}
                """
            )
            if return_type.get("kind") == "nary_tree":
                result_conversion = "coderpuzzleNodeJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "nary_tree"):
                result_conversion = "coderpuzzleNodeArrayJSON"
        if "quad_tree" in structs:
            struct_codecs += textwrap.dedent(
                """
                func (reader *coderpuzzleReaderType) quadTree() *QuadNode {
                    if reader.take(1)[0] == 0 { return nil }
                    isLeaf := reader.take(1)[0] == 1
                    node := &QuadNode{IsLeaf: isLeaf, Val: reader.take(1)[0] == 1}
                    if !node.IsLeaf {
                        node.TopLeft = reader.quadTree()
                        node.TopRight = reader.quadTree()
                        node.BottomLeft = reader.quadTree()
                        node.BottomRight = reader.quadTree()
                    }
                    return node
                }
                // LC display wire: a flat preorder of [isLeaf, val] pairs; a
                // non-leaf's val normalizes to 0 on both sides.
                func coderpuzzleQuadJSON(node *QuadNode) any {
                    // LC display wire: one flat preorder list of [isLeaf,
                    // val] pairs; a non-leaf's val normalizes to 0.
                    if node == nil { return nil }
                    rows := []any{}
                    var walk func(node *QuadNode)
                    walk = func(node *QuadNode) {
                        if node == nil {
                            rows = append(rows, nil)
                            return
                        }
                        if node.IsLeaf {
                            value := 0
                            if node.Val { value = 1 }
                            rows = append(rows, []any{1, value})
                            return
                        }
                        rows = append(rows, []any{0, 0})
                        walk(node.TopLeft)
                        walk(node.TopRight)
                        walk(node.BottomLeft)
                        walk(node.BottomRight)
                    }
                    walk(node)
                    return rows
                }
                func coderpuzzleQuadArrayJSON(nodes []*QuadNode) []any {
                    return coderpuzzleArrayOfMapped(nodes, coderpuzzleQuadJSON)
                }
                """
            )
            if return_type.get("kind") == "quad_tree":
                result_conversion = "coderpuzzleQuadJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "quad_tree"):
                result_conversion = "coderpuzzleQuadArrayJSON"
        if "nested" in structs:
            struct_codecs += textwrap.dedent(
                """
                func (reader *coderpuzzleReaderType) nestedInteger() NestedInteger {
                    tag := reader.take(1)[0]
                    if tag == 1 {
                        value := NestedInteger{}
                        value.SetInteger(reader.int32())
                        return value
                    }
                    if tag != 2 { panic("Invalid nested tag") }
                    length := int(reader.uint32())
                    value := NestedInteger{}
                    for index := 0; index < length; index++ { value.Add(reader.nestedInteger()) }
                    return value
                }
                func coderpuzzleNestedJSON(value NestedInteger) any {
                    if value.IsInteger() { return value.GetInteger() }
                    values := []any{}
                    for _, item := range value.GetList() {
                        values = append(values, coderpuzzleNestedJSON(*item))
                    }
                    return values
                }
                func coderpuzzleNestedArrayJSON(values []NestedInteger) []any {
                    return coderpuzzleArrayOfMapped(values, coderpuzzleNestedJSON)
                }
                """
            )
            if return_type.get("kind") == "nested":
                result_conversion = "coderpuzzleNestedJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "nested"):
                result_conversion = "coderpuzzleNestedArrayJSON"
        if "next_tree" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                func (reader *coderpuzzleReaderType) nextTree() *NodeWithNext {{
                    length := int(reader.uint32())
                    type slot struct {{
                        present bool
                        value   {item_type}
                    }}
                    slots := make([]slot, length)
                    for index := 0; index < length; index++ {{
                        if reader.take(1)[0] == 1 {{
                            slots[index] = slot{{present: true, value: {item_expression}}}
                        }}
                    }}
                    if length == 0 || !slots[0].present {{ return nil }}
                    root := &NodeWithNext{{Val: slots[0].value}}
                    queue := []*NodeWithNext{{root}}
                    index := 1
                    for len(queue) > 0 && index < length {{
                        node := queue[0]
                        queue = queue[1:]
                        if index < length {{
                            if slots[index].present {{
                                node.Left = &NodeWithNext{{Val: slots[index].value, Parent: node}}
                                queue = append(queue, node.Left)
                            }}
                            index++
                        }}
                        if index < length {{
                            if slots[index].present {{
                                node.Right = &NodeWithNext{{Val: slots[index].value, Parent: node}}
                                queue = append(queue, node.Right)
                            }}
                            index++
                        }}
                    }}
                    return root
                }}
                // The next-connected wire result is a list of levels read
                // purely through next pointers; the next level starts at the
                // first non-nil child found scanning the current one.
                func coderpuzzleNextTreeJSON(root *NodeWithNext) []any {{
                    // LC display wire: values with one null marker between
                    // adjacent levels; the walk advances to the first child
                    // found anywhere in the level (left, else right) so
                    // imperfect trees serialize too. A nil root is the
                    // empty wire [] like every other node serializer here.
                    if root == nil {{ return []any{{}} }}
                    var values []any
                    level := root
                    for level != nil {{
                        var nextLevel *NodeWithNext
                        for node := level; node != nil; node = node.Next {{
                            values = append(values, node.Val)
                            if nextLevel == nil {{
                                if node.Left != nil {{
                                    nextLevel = node.Left
                                }} else if node.Right != nil {{
                                    nextLevel = node.Right
                                }}
                            }}
                        }}
                        values = append(values, nil)
                        level = nextLevel
                    }}
                    for len(values) > 0 && values[len(values)-1] == nil {{
                        values = values[:len(values)-1]
                    }}
                    return values
                }}
                func coderpuzzleNextTreeArrayJSON(roots []*NodeWithNext) []any {{
                    return coderpuzzleArrayOfMapped(roots, coderpuzzleNextTreeJSON)
                }}
                """
            )
            if return_type.get("kind") == "next_tree":
                result_conversion = "coderpuzzleNextTreeJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "next_tree"):
                result_conversion = "coderpuzzleNextTreeArrayJSON"
        if "circular_list" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                // A circular wire carries the ring's values; the decoder
                // closes the ring (tail.Next = head) exactly like the
                // harness languages, so solutions always see a real ring.
                func (reader *coderpuzzleReaderType) circularList() *ListNode {{
                    length := int(reader.uint32())
                    if length == 0 {{ return nil }}
                    head := &ListNode{{Val: {item_expression}}}
                    tail := head
                    for index := 1; index < length; index++ {{
                        tail.Next = &ListNode{{Val: {item_expression}}}
                        tail = tail.Next
                    }}
                    tail.Next = head
                    return head
                }}
                func coderpuzzleCircularJSON(head *ListNode) []any {{
                    if head == nil {{ return []any{{}} }}
                    values := []any{{}}
                    node := head
                    for bound := 0; bound < 1<<20; bound++ {{
                        values = append(values, node.Val)
                        node = node.Next
                        if node == head {{ return values }}
                        if node == nil {{ panic("Circular list is not closed") }}
                    }}
                    panic("Circular list exceeds the walk bound")
                }}
                func coderpuzzleCircularArrayJSON(heads []*ListNode) []any {{
                    return coderpuzzleArrayOfMapped(heads, coderpuzzleCircularJSON)
                }}
                """
            )
            if return_type.get("kind") == "circular_list":
                result_conversion = "coderpuzzleCircularJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "circular_list"):
                result_conversion = "coderpuzzleCircularArrayJSON"
        if "doubly_circular" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                // LC 426: left is prev, right is next; read the ring open
                // and verify every back-link on the way out.
                func (reader *coderpuzzleReaderType) doublyCircular() *NodeWithNext {{
                    length := int(reader.uint32())
                    if length == 0 {{ return nil }}
                    head := &NodeWithNext{{Val: {item_expression}}}
                    tail := head
                    for index := 1; index < length; index++ {{
                        tail.Right = &NodeWithNext{{Val: {item_expression}, Left: tail}}
                        tail = tail.Right
                    }}
                    return head
                }}
                func coderpuzzleDoublyJSON(head *NodeWithNext) []any {{
                    if head == nil {{ return []any{{}} }}
                    values := []any{{}}
                    var previous *NodeWithNext
                    node := head
                    for bound := 0; bound < 1<<20; bound++ {{
                        // head's own back-link is the tail, verified when
                        // the walk closes below.
                        if previous != nil && node.Left != previous {{
                            panic("Doubly linked list is not properly linked")
                        }}
                        values = append(values, node.Val)
                        previous = node
                        node = node.Right
                        if node == head {{
                            if head.Left != previous {{
                                panic("Doubly linked list is not properly linked")
                            }}
                            return values
                        }}
                        if node == nil {{ panic("Doubly linked list is not closed") }}
                    }}
                    panic("Doubly linked list exceeds the walk bound")
                }}
                func coderpuzzleDoublyArrayJSON(heads []*NodeWithNext) []any {{
                    return coderpuzzleArrayOfMapped(heads, coderpuzzleDoublyJSON)
                }}
                """
            )
            if return_type.get("kind") == "doubly_circular":
                result_conversion = "coderpuzzleDoublyJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "doubly_circular"):
                result_conversion = "coderpuzzleDoublyArrayJSON"
        if "multi_list" in structs:
            struct_codecs += textwrap.dedent(
                """
                // One chain: u32 n, then per node the value, a child flag,
                // and the flagged child's own chain. Every chain (top and
                // nested) gets its prev links set.
                func (reader *coderpuzzleReaderType) multiList() *MultiListNode {
                    length := int(reader.uint32())
                    var head, tail *MultiListNode
                    for index := 0; index < length; index++ {
                        node := &MultiListNode{Val: reader.int32()}
                        if tail == nil {
                            head = node
                        } else {
                            tail.Next = node
                            node.Prev = tail
                        }
                        tail = node
                        if reader.take(1)[0] == 1 { node.Child = reader.multiList() }
                    }
                    return head
                }
                // A flattened result must be a clean doubly chain: every
                // prev back-link set, no child left.
                func coderpuzzleMultiJSON(head *MultiListNode) []any {
                    values := []any{}
                    var previous *MultiListNode
                    node := head
                    for bound := 0; node != nil && bound < 1<<20; bound++ {
                        if node.Prev != previous || node.Child != nil {
                            panic("Flattened list is not properly linked")
                        }
                        values = append(values, node.Val)
                        previous = node
                        node = node.Next
                    }
                    if node != nil { panic("Flattened list exceeds the walk bound") }
                    return values
                }
                func coderpuzzleMultiArrayJSON(heads []*MultiListNode) []any {
                    return coderpuzzleArrayOfMapped(heads, coderpuzzleMultiJSON)
                }
                """
            )
            if return_type.get("kind") == "multi_list":
                result_conversion = "coderpuzzleMultiJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "multi_list"):
                result_conversion = "coderpuzzleMultiArrayJSON"
        if "graph" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                func coderpuzzleSeenBefore[T comparable](queue []T, index int, node T) bool {{
                    for _, earlier := range queue[:index] {{
                        if earlier == node {{ return true }}
                    }}
                    return false
                }}
                func (reader *coderpuzzleReaderType) graph() *{graph_class} {{
                    count := int(reader.uint32())
                    if count == 0 {{ return nil }}
                    nodes := make([]*{graph_class}, count)
                    for index := range nodes {{
                        nodes[index] = &{graph_class}{{Val: {item_type}(index + 1)}}
                    }}
                    for index := 0; index < count; index++ {{
                        degree := int(reader.uint32())
                        for neighbor := 0; neighbor < degree; neighbor++ {{
                            value := {item_expression} + 1
                            if value < 1 || value > {item_type}(count) {{
                                panic("Graph neighbor is out of range")
                            }}
                            nodes[index].Neighbors = append(nodes[index].Neighbors, nodes[value-1])
                        }}
                    }}
                    return nodes[0]
                }}
                func coderpuzzleCollectGraph(root *{graph_class}) {{
                    if root == nil {{ return }}
                    queue := []*{graph_class}{{root}}
                    for index := 0; index < len(queue); index++ {{
                        node := queue[index]
                        if coderpuzzleSeenBefore(queue, index, node) {{ continue }}
                        coderpuzzleInputNodes = append(coderpuzzleInputNodes, node)
                        queue = append(queue, node.Neighbors...)
                    }}
                }}
                // Rows ordered by node value; neighbor order is normalized
                // (sorted) since LC treats adjacency order as irrelevant.
                func coderpuzzleGraphJSON(root *{graph_class}) []any {{
                    var visited []*{graph_class}
                    if root != nil {{
                        queue := []*{graph_class}{{root}}
                        for index := 0; index < len(queue); index++ {{
                            node := queue[index]
                            if coderpuzzleSeenBefore(queue, index, node) {{ continue }}
                            visited = append(visited, node)
                            queue = append(queue, node.Neighbors...)
                        }}
                    }}
                    for _, node := range visited {{
                        if coderpuzzleRegisteredInput(node) {{
                            panic("Returned graph shares nodes with the input graph")
                        }}
                    }}
                    sort.Slice(visited, func(a, b int) bool {{ return visited[a].Val < visited[b].Val }})
                    rows := []any{{}}
                    for _, node := range visited {{
                        neighbors := make([]int, len(node.Neighbors))
                        for index, neighbor := range node.Neighbors {{
                            neighbors[index] = neighbor.Val
                        }}
                        sort.Ints(neighbors)
                        row := make([]any, len(neighbors))
                        for index, neighbor := range neighbors {{ row[index] = neighbor }}
                        rows = append(rows, row)
                    }}
                    return rows
                }}
                func coderpuzzleGraphArrayJSON(roots []*{graph_class}) []any {{
                    return coderpuzzleArrayOfMapped(roots, coderpuzzleGraphJSON)
                }}
                """
            )
            if return_type.get("kind") == "graph":
                result_conversion = "coderpuzzleGraphJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "graph"):
                result_conversion = "coderpuzzleGraphArrayJSON"
        if "random_list" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                func (reader *coderpuzzleReaderType) randomList() *{random_class} {{
                    count := int(reader.uint32())
                    if count == 0 {{ return nil }}
                    nodes := make([]*{random_class}, count)
                    targets := make([]uint32, count)
                    // Each row carries [val, random] together.
                    for index := 0; index < count; index++ {{
                        nodes[index] = &{random_class}{{Val: {item_expression}}}
                        targets[index] = reader.uint32()
                    }}
                    for index := 0; index+1 < count; index++ {{ nodes[index].Next = nodes[index+1] }}
                    for index := 0; index < count; index++ {{
                        if targets[index] == 0xFFFFFFFF {{ continue }}
                        if int(targets[index]) >= count {{
                            panic("Random pointer target is out of range")
                        }}
                        nodes[index].Random = nodes[targets[index]]
                    }}
                    return nodes[0]
                }}
                func coderpuzzleCollectRandom(head *{random_class}) {{
                    for node := head; node != nil; node = node.Next {{
                        coderpuzzleInputNodes = append(coderpuzzleInputNodes, node)
                    }}
                }}
                func coderpuzzleRandomJSON(head *{random_class}) []any {{
                    var nodes []*{random_class}
                    for node := head; node != nil; node = node.Next {{
                        for _, earlier := range nodes {{
                            if earlier == node {{ panic("Random list has a cycle in next") }}
                        }}
                        nodes = append(nodes, node)
                    }}
                    for _, node := range nodes {{
                        if coderpuzzleRegisteredInput(node) {{
                            panic("Returned list shares nodes with the input list")
                        }}
                    }}
                    rows := []any{{}}
                    for _, node := range nodes {{
                        row := []any{{node.Val, nil}}
                        if node.Random != nil {{
                            target := -1
                            for index, candidate := range nodes {{
                                if candidate == node.Random {{
                                    target = index
                                    break
                                }}
                            }}
                            if target < 0 {{ panic("Random pointer leaves the returned list") }}
                            row[1] = target
                        }}
                        rows = append(rows, row)
                    }}
                    return rows
                }}
                func coderpuzzleRandomArrayJSON(heads []*{random_class}) []any {{
                    return coderpuzzleArrayOfMapped(heads, coderpuzzleRandomJSON)
                }}
                """
            )
            if return_type.get("kind") == "random_list":
                result_conversion = "coderpuzzleRandomJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "random_list"):
                result_conversion = "coderpuzzleRandomArrayJSON"
        if "doubly_list" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                // LC 3263: an open chain wired in both directions.
                func (reader *coderpuzzleReaderType) doublyList() *{doubly_class} {{
                    if reader.take(1)[0] == 0 {{ return nil }}
                    count := int(reader.uint32())
                    var head, tail *{doubly_class}
                    for index := 0; index < count; index++ {{
                        node := &{doubly_class}{{Val: {item_expression}}}
                        if tail == nil {{ head = node }} else {{ tail.Next = node; node.Prev = tail }}
                        tail = node
                    }}
                    return head
                }}
                // The forward walk must agree with every back-link,
                // mirroring the doubly_circular invariant on an open chain.
                func coderpuzzleDoublyListJSON(head *{doubly_class}) []any {{
                    values := []any{{}}
                    var previous *{doubly_class}
                    node := head
                    for bound := 0; node != nil && bound < 1<<20; bound++ {{
                        if node.Prev != previous {{
                            panic("Doubly linked list is not properly linked")
                        }}
                        values = append(values, node.Val)
                        previous = node
                        node = node.Next
                    }}
                    if node != nil {{ panic("Doubly linked list exceeds the walk bound") }}
                    return values
                }}
                func coderpuzzleDoublyListArrayJSON(heads []*{doubly_class}) []any {{
                    return coderpuzzleArrayOfMapped(heads, coderpuzzleDoublyListJSON)
                }}
                """
            )
            if return_type.get("kind") == "doubly_list":
                result_conversion = "coderpuzzleDoublyListJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "doubly_list"):
                result_conversion = "coderpuzzleDoublyListArrayJSON"
        if "doubly_list_node" in structs:
            doubly_node_spec = next(
                (spec for spec in parameters if spec.get("kind") == "doubly_list_node"), {}
            )
            doubly_node_target = _read_expression(
                doubly_node_spec.get("items") or struct_item_spec(invocation), "reader"
            )
            struct_codecs += textwrap.dedent(
                f"""
                // LC 3294: the chain plus the value of the received node
                // (values are unique per the constraints).
                func (reader *coderpuzzleReaderType) doublyListNode() *{doubly_node_class} {{
                    var head, tail *{doubly_node_class}
                    if reader.take(1)[0] == 1 {{
                        count := int(reader.uint32())
                        for index := 0; index < count; index++ {{
                            node := &{doubly_node_class}{{Val: {item_expression}}}
                            if tail == nil {{ head = node }} else {{ tail.Next = node; node.Prev = tail }}
                            tail = node
                        }}
                    }}
                    target := {doubly_node_target}
                    for node := head; node != nil; node = node.Next {{
                        if node.Val == target {{ return node }}
                    }}
                    panic("doubly_list_node target value is not in the chain")
                }}
                """
            )
        if "random_tree" in structs:
            struct_codecs += textwrap.dedent(
                f"""
                // LC 1485: binary-tree level order whose present slots are
                // [val, random] rows — random_list's index addressing on a
                // tree topology. The index counts present nodes in level
                // order, from the root.
                func (reader *coderpuzzleReaderType) randomTree() *{random_tree_class} {{
                    length := int(reader.uint32())
                    if length == 0 {{ return nil }}
                    type slot struct {{
                        present bool
                        value   {item_type}
                        random  uint32
                    }}
                    slots := make([]slot, length)
                    for index := 0; index < length; index++ {{
                        if reader.take(1)[0] == 1 {{
                            value := {item_expression}
                            slots[index] = slot{{present: true, value: value, random: reader.uint32()}}
                        }}
                    }}
                    if !slots[0].present {{ panic("random_tree root must be a [val, random] row") }}
                    root := &{random_tree_class}{{Val: slots[0].value}}
                    order := []*{random_tree_class}{{root}}
                    type link struct {{
                        node   *{random_tree_class}
                        random uint32
                    }}
                    links := []link{{{{root, slots[0].random}}}}
                    queue := []*{random_tree_class}{{root}}
                    index := 1
                    for len(queue) > 0 && index < length {{
                        node := queue[0]
                        queue = queue[1:]
                        if index < length {{
                            if slots[index].present {{
                                node.Left = &{random_tree_class}{{Val: slots[index].value}}
                                order = append(order, node.Left)
                                links = append(links, link{{node.Left, slots[index].random}})
                                queue = append(queue, node.Left)
                            }}
                            index++
                        }}
                        if index < length {{
                            if slots[index].present {{
                                node.Right = &{random_tree_class}{{Val: slots[index].value}}
                                order = append(order, node.Right)
                                links = append(links, link{{node.Right, slots[index].random}})
                                queue = append(queue, node.Right)
                            }}
                            index++
                        }}
                    }}
                    for _, entry := range links {{
                        if entry.random == 0xFFFFFFFF {{ continue }}
                        if int(entry.random) >= len(order) {{
                            panic("Random pointer target is out of range")
                        }}
                        entry.node.Random = order[entry.random]
                    }}
                    return root
                }}
                func coderpuzzleCollectRandomTree(root *{random_tree_class}) {{
                    queue := []*{random_tree_class}{{root}}
                    for index := 0; index < len(queue); index++ {{
                        node := queue[index]
                        if node == nil {{ continue }}
                        seen := false
                        for _, earlier := range queue[:index] {{
                            if earlier == node {{ seen = true; break }}
                        }}
                        if seen {{ continue }}
                        coderpuzzleInputNodes = append(coderpuzzleInputNodes, node)
                        queue = append(queue, node.Left, node.Right)
                    }}
                }}
                // Level order rows like the input side; the clone check
                // forbids returning (part of) the input tree, and every
                // random pointer must land inside the returned tree.
                func coderpuzzleRandomTreeJSON(root *{random_tree_class}) []any {{
                    rows := []any{{}}
                    if root == nil {{ return rows }}
                    var order []*{random_tree_class}
                    queue := []*{random_tree_class}{{root}}
                    for index := 0; index < len(queue); index++ {{
                        node := queue[index]
                        if node == nil {{
                            rows = append(rows, nil)
                            order = append(order, nil)
                            continue
                        }}
                        for _, earlier := range order {{
                            if earlier == node {{ panic("Random tree repeats a node in level order") }}
                        }}
                        rows = append(rows, node.Val)
                        order = append(order, node)
                        queue = append(queue, node.Left, node.Right)
                    }}
                    for len(rows) > 0 && rows[len(rows)-1] == nil {{
                        rows = rows[:len(rows)-1]
                        order = order[:len(order)-1]
                    }}
                    for _, node := range order {{
                        if coderpuzzleRegisteredInput(node) {{
                            panic("Returned tree shares nodes with the input tree")
                        }}
                    }}
                    present := []*{random_tree_class}{{}}
                    for _, node := range order {{
                        if node != nil {{ present = append(present, node) }}
                    }}
                    encoded := []any{{}}
                    for _, node := range order {{
                        if node == nil {{ encoded = append(encoded, nil); continue }}
                        row := []any{{node.Val, nil}}
                        if node.Random != nil {{
                            target := -1
                            for position, candidate := range present {{
                                if candidate == node.Random {{ target = position; break }}
                            }}
                            if target < 0 {{ panic("Random pointer leaves the returned tree") }}
                            row[1] = target
                        }}
                        encoded = append(encoded, row)
                    }}
                    return encoded
                }}
                func coderpuzzleRandomTreeArrayJSON(roots []*{random_tree_class}) []any {{
                    return coderpuzzleArrayOfMapped(roots, coderpuzzleRandomTreeJSON)
                }}
                """
            )
            if return_type.get("kind") == "random_tree":
                result_conversion = "coderpuzzleRandomTreeJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "random_tree"):
                result_conversion = "coderpuzzleRandomTreeArrayJSON"
        if "special_tree" in structs:
            struct_codecs += textwrap.dedent(
                """
                // LC 2773: an ordinary display decode, then the leaves
                // b1..bk (in increasing value order) are ring-wired left to
                // the previous and right to the next leaf — the special
                // property the statement grants, which the display cannot
                // carry.
                func (reader *coderpuzzleReaderType) specialTree() *TreeNode {
                    root := reader.tree()
                    if root == nil { return nil }
                    leaves := []*TreeNode{}
                    queue := []*TreeNode{root}
                    for index := 0; index < len(queue); index++ {
                        node := queue[index]
                        if node == nil { continue }
                        if node.Left == nil && node.Right == nil {
                            leaves = append(leaves, node)
                        } else {
                            queue = append(queue, node.Left, node.Right)
                        }
                    }
                    sort.Slice(leaves, func(a, b int) bool { return leaves[a].Val < leaves[b].Val })
                    count := len(leaves)
                    for position := 0; position < count; position++ {
                        leaves[position].Left = leaves[(position-1+count)%count]
                        leaves[position].Right = leaves[(position+1)%count]
                    }
                    return root
                }
                """
            )
        if "nary_tree_nodes" in structs:
            struct_codecs += textwrap.dedent(
                """
                // LC 1506: the n-ary display decoded and handed over as the
                // list of its nodes (level order — any order is faithful,
                // the statement grants an arbitrary permutation).
                func (reader *coderpuzzleReaderType) naryTreeNodes() []*Node {
                    root := reader.naryTree()
                    nodes := []*Node{}
                    queue := []*Node{}
                    if root != nil { queue = append(queue, root) }
                    for index := 0; index < len(queue); index++ {
                        node := queue[index]
                        nodes = append(nodes, node)
                        queue = append(queue, node.Children...)
                    }
                    return nodes
                }
                """
            )
        if "alias_list" in structs:
            struct_codecs += textwrap.dedent(
                """
                // LC 160: the intersection is by identity — the result must
                // be a node taken from the input lists, and the wire is the
                // shared tail's values.
                func coderpuzzleAliasJSON(node *ListNode) []any {
                    if node == nil { return []any{} }
                    if !coderpuzzleRegisteredInput(node) {
                        panic("Returned node is not part of the input lists")
                    }
                    values := []any{}
                    for walk := node; walk != nil; walk = walk.Next {
                        values = append(values, walk.Val)
                    }
                    return values
                }
                func coderpuzzleAliasArrayJSON(nodes []*ListNode) []any {
                    return coderpuzzleArrayOfMapped(nodes, coderpuzzleAliasJSON)
                }
                """
            )
            if return_type.get("kind") == "alias_list":
                result_conversion = "coderpuzzleAliasJSON"
            if (return_type.get("kind") == "array"
                    and (return_type.get("items") or {}).get("kind") == "alias_list"):
                result_conversion = "coderpuzzleAliasArrayJSON"
        for name, spec in sorted(struct_specs.items()):
            reads = ", ".join(
                _read_expression(field["value_type"], "reader")
                for field in spec.get("fields") or []
            )
            struct_codecs += textwrap.dedent(
                f"""
                func (reader *coderpuzzleReaderType) {name}() {name} {{
                    return {name}{{{reads}}}
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
        collectors = {
            "linked_list": "coderpuzzleCollectList",
            "graph": "coderpuzzleCollectGraph",
            "random_list": "coderpuzzleCollectRandom",
            "random_tree": "coderpuzzleCollectRandomTree",
        }

        def declaration(index: int, spec: dict[str, Any]) -> str:
            kind = spec.get("kind")
            if kind == "alias_list":
                # This block reads inline in coderpuzzleExecute, where the
                # reader variable is coderpuzzleReader (not the receiver name).
                main_item = _read_expression(struct_item_spec(invocation), "coderpuzzleReader")
                lines = [
                    f"coderpuzzleArg{index} := func() *ListNode {{",
                    "    count := int(coderpuzzleReader.uint32())",
                    "    var head, tail *ListNode",
                    "    var prefix []*ListNode",
                    "    for step := 0; step < count; step++ {",
                    f"        node := &ListNode{{Val: {main_item}}}",
                    "        prefix = append(prefix, node)",
                    "        if head == nil { head = node } else { tail.Next = node }",
                    "        tail = node",
                    "    }",
                    "    spliceAt := int(coderpuzzleReader.uint32())",
                    f"    if spliceAt < len(coderpuzzleArg{spec['alias']}Nodes) {{",
                    "        if tail == nil {"
                    f" head = coderpuzzleArg{spec['alias']}Nodes[spliceAt]"
                    f" }} else {{ tail.Next = coderpuzzleArg{spec['alias']}Nodes[spliceAt] }}",
                    "    }",
                    "    for _, node := range prefix { coderpuzzleInputNodes = append(coderpuzzleInputNodes, node) }",
                    "    return head",
                    "}()",
                ]
                return _tabs("\n".join(lines))
            if kind == "nary_tree_ref":
                # LC 1516: the value names a node inside the ALREADY-DECODED
                # aliased tree; the argument is that exact pointer (shared
                # identity — mutations through it land in the aliased tree).
                target_item = _read_expression(
                    spec.get("items") or {"kind": "integer", "bits": 32}, "coderpuzzleReader"
                )
                lines = [
                    f"coderpuzzleArg{index} := func() *Node {{",
                    f"    target := {target_item}",
                    "    var found *Node",
                    "    var walk func(node *Node)",
                    "    walk = func(node *Node) {",
                    "        if node == nil || found != nil { return }",
                    "        if node.Val == target { found = node; return }",
                    "        for _, child := range node.Children { walk(child) }",
                    "    }",
                    f"    walk(coderpuzzleArg{spec['alias']})",
                    '    if found == nil { panic("nary_tree_ref target value is not in the aliased tree") }',
                    "    return found",
                    "}()",
                ]
                return _tabs("\n".join(lines))
            lines = [f"coderpuzzleArg{index} := {_read_expression(spec)}"]
            if kind == "linked_list" and index in alias_sources:
                lines.extend([
                    f"var coderpuzzleArg{index}Nodes []*ListNode",
                    f"for node := coderpuzzleArg{index}; node != nil; node = node.Next {{"
                    f" coderpuzzleArg{index}Nodes = append(coderpuzzleArg{index}Nodes, node) }}",
                ])
            if kind in collectors:
                lines.append(f"{collectors[kind]}(coderpuzzleArg{index})")
            return _tabs("\n".join(lines))

        declarations = "\n".join(
            declaration(index, spec) for index, spec in enumerate(parameters)
        )
        arguments = ", ".join(f"coderpuzzleArg{index}" for index in range(len(parameters)))
        code, merged_imports = _merge_imports(
            code, extra=("sort",) if structs & {"graph", "special_tree"} else ()
        )
        source = (
            f"package main\n\nimport (\n{merged_imports})\n\n"
            + _tabs(
                textwrap.dedent(
                    f"""
                    {code}

                    type coderpuzzleReaderType struct {{
                        data   []byte
                        offset int
                    }}

                    func (reader *coderpuzzleReaderType) take(count int) []byte {{
                        if count < 0 || count > len(reader.data)-reader.offset {{ panic("truncated judge input") }}
                        value := reader.data[reader.offset : reader.offset+count]
                        reader.offset += count
                        return value
                    }}
                    func (reader *coderpuzzleReaderType) uint32() uint32 {{ return binary.BigEndian.Uint32(reader.take(4)) }}
                    func (reader *coderpuzzleReaderType) int32() int {{ return int(int32(reader.uint32())) }}
                    func (reader *coderpuzzleReaderType) int64() int64 {{ return int64(binary.BigEndian.Uint64(reader.take(8))) }}
                    func (reader *coderpuzzleReaderType) number() float64 {{ return math.Float64frombits(binary.BigEndian.Uint64(reader.take(8))) }}
                    func (reader *coderpuzzleReaderType) boolean() bool {{ value := reader.take(1)[0]; if value > 1 {{ panic("invalid boolean input") }}; return value == 1 }}
                    func (reader *coderpuzzleReaderType) text() string {{ return string(reader.take(int(reader.uint32()))) }}
                    func (reader *coderpuzzleReaderType) finished() {{ if reader.offset != len(reader.data) {{ panic("trailing judge input") }} }}
                    func coderpuzzleArray[T any](reader *coderpuzzleReaderType, read func(*coderpuzzleReaderType) T) []T {{
                        length := int(reader.uint32())
                        values := make([]T, length)
                        for index := range values {{ values[index] = read(reader) }}
                        return values
                    }}
                    func coderpuzzleArrayOf[T any](values []T, convert func(T) any) []any {{
                        result := make([]any, len(values))
                        for index, value := range values {{ result[index] = convert(value) }}
                        return result
                    }}
                    // The per-kind JSON codecs return []any, so array-of-node
                    // results map through this two-parameter variant — Go
                    // inference cannot assign func(T) R to func(T) any.
                    func coderpuzzleArrayOfMapped[T any, R any](values []T, convert func(T) R) []any {{
                        result := make([]any, len(values))
                        for index, value := range values {{ result[index] = convert(value) }}
                        return result
                    }}
                    func coderpuzzleIdentity(value any) any {{ return value }}
                    // The registry of input-side node pointers backs the
                    // clone/identity checks for graph, random_list, and
                    // alias_list returns: the judge compares row data, so
                    // only the wrapper can catch a solution that returns the
                    // input structure itself.
                    var coderpuzzleInputNodes []any

                    func coderpuzzleRegisteredInput(node any) bool {{
                        for _, input := range coderpuzzleInputNodes {{
                            if input == node {{ return true }}
                        }}
                        return false
                    }}
{struct_codecs}
                    func coderpuzzleExecute() (response map[string]any) {{
                        defer func() {{
                            if recovered := recover(); recovered != nil {{
                                response = map[string]any{{"status": "runtime_error", "error": fmt.Sprint(recovered)}}
                            }}
                        }}()
                        bytes, errorValue := io.ReadAll(os.Stdin)
                        if errorValue != nil {{ panic(errorValue) }}
                        coderpuzzleReader := &coderpuzzleReaderType{{data: bytes}}
                    {declarations}
                        coderpuzzleReader.finished()
                        coderpuzzleRaw := {method}({arguments})
                        coderpuzzleActual := {result_conversion}(coderpuzzleRaw)
                        return map[string]any{{"status": "completed", "actual": coderpuzzleActual}}
                    }}

                    func coderpuzzleEmit(line string) {{
                        // The last valid protocol line wins and is JSON-validated; the
                        // fd keeps ordinary stdout noise out of the channel, but the
                        // submission inherits it too — an accepted result must still
                        // carry matching output.
                        if channel := os.NewFile(63, "protocol"); channel != nil {{
                            if _, errorValue := channel.WriteString(line + "\\n"); errorValue == nil {{
                                return
                            }}
                        }}
                        fmt.Println(line)
                    }}

                    func main() {{
                        response := coderpuzzleExecute()
                        encoded, errorValue := json.Marshal(response)
                        if errorValue != nil {{ encoded, _ = json.Marshal(map[string]any{{"status": "runtime_error", "error": errorValue.Error()}}) }}
                        coderpuzzleEmit("__CODERPUZZLE_RESULT__" + string(encoded))
                    }}
                    """
                )
            )
        )
        source_path = job_root / "main.go"
        executable = job_root / "solution"
        source_path.write_text(source, encoding="utf-8")
        source_path.chmod(0o444)
        self.compile(
            job_root,
            (
                self.compiler_path,
                "build",
                "-trimpath",
                "-ldflags=-s -w",
                "-o",
                str(executable),
                str(source_path),
                *assembly_paths,
            ),
            executable,
            {
                "PATH": "/usr/bin:/bin",
                "HOME": "/nonexistent",
                "TMPDIR": "/tmp",
                # One shared build cache across submissions: a per-job cache
                # would force every compile to rebuild the standard library.
                "GOCACHE": "/tmp/coderpuzzle-gocache",
                "GOENV": "off",
                "GOPROXY": "off",
                "CGO_ENABLED": "0",
                "GOMAXPROCS": "1",
            },
        )
        return PreparedProgram(
            command=(str(executable),),
            environment={
                "PATH": "/usr/bin:/bin",
                "HOME": "/nonexistent",
                "TMPDIR": str(scratch),
                "GOMAXPROCS": "1",
                "GOMEMLIMIT": "192MiB",
                "GOTRACEBACK": "none",
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
