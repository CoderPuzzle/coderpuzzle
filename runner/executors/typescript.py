import textwrap
from pathlib import Path
from typing import Any

from .base import PreparedProgram
from .compiled import CompiledExecutor
from .typed import (
    encode_case,
    function_signature,
    provided_node_class,
    struct_item_spec,
    uses_struct_kinds,
)


def _read_expression(spec: dict[str, Any], receiver: str = "coderpuzzleReader") -> str:
    kind = spec["kind"]
    if kind == "integer":
        return (
            f"{receiver}.int32()"
            if spec.get("bits", 32) == 32
            else f"{receiver}.int64()"
        )
    if kind == "number":
        return f"{receiver}.number()"
    if kind == "boolean":
        return f"{receiver}.boolean()"
    if kind == "string":
        return f"{receiver}.string()"
    if kind == "linked_list":
        return f"{receiver}.linkedList()"
    if kind == "binary_tree":
        return f"{receiver}.tree()"
    if kind == "nary_tree":
        return f"{receiver}.naryTree()"
    if kind == "quad_tree":
        return f"{receiver}.quadTree()"
    if kind == "nested":
        return f"{receiver}.nested()"
    if kind == "next_tree":
        return f"{receiver}.nextTree()"
    if kind == "circular_list":
        return f"{receiver}.circularList()"
    if kind == "doubly_circular":
        return f"{receiver}.doublyCircular()"
    if kind == "multi_list":
        return f"{receiver}.multiList()"
    if kind == "graph":
        return f"{receiver}.graph()"
    if kind == "random_list":
        return f"{receiver}.randomList()"
    if kind == "doubly_list":
        return f"{receiver}.doublyList()"
    if kind == "doubly_list_node":
        return f"{receiver}.doublyListNode()"
    if kind == "random_tree":
        return f"{receiver}.randomTree()"
    if kind == "special_tree":
        return f"{receiver}.specialTree()"
    if kind == "nary_tree_nodes":
        return f"{receiver}.naryTreeNodes()"
    if kind == "json":
        return f"{receiver}.json()"
    if kind == "struct":
        return f"{receiver}.read{spec['class']}()"
    return f"{receiver}.array(() => {_read_expression(spec['items'], receiver)})"


def _uses_json(spec: Any) -> bool:
    """Whether a type spec (or any nested array item) is the generic JSON
    kind — the one kind uses_struct_kinds does not collect, since it names
    no class and needs no prelude."""
    if not isinstance(spec, dict):
        return False
    if spec.get("kind") == "json":
        return True
    return _uses_json(spec.get("items"))


def _collect_structs(spec: Any, found: dict[str, dict[str, Any]]) -> None:
    if not isinstance(spec, dict):
        return
    if spec.get("kind") == "struct":
        found.setdefault(spec["class"], spec)
    elif spec.get("kind") == "array":
        _collect_structs(spec.get("items"), found)


def _struct_codecs(invocation: dict[str, Any]) -> tuple[str, str]:
    """Return result-array helpers and codecs for bundle-provided structures."""
    structs = uses_struct_kinds(invocation)
    # Graph and random_list nodes are the using problem's provided/ class
    # (LC 133/138 ship their own); the codecs below render around
    # that name via the placeholders replaced at the end.
    graph_class = provided_node_class(invocation, "graph")
    random_class = provided_node_class(invocation, "random_list")
    # The second-wave pointer kinds name the using problem's provided/
    # class too. A doubly_list_node parameter carries the class when the
    # problem only ships that kind — the chain kind is the same node.
    doubly_class = provided_node_class(invocation, "doubly_list")
    if doubly_class == "Node" and "doubly_list_node" in structs:
        doubly_class = provided_node_class(invocation, "doubly_list_node")
    random_tree_class = provided_node_class(invocation, "random_tree")
    item_read = "this.int64()" if struct_item_spec(invocation).get("bits", 32) == 64 else "this.int32()"
    struct_specs: dict[str, dict[str, Any]] = {}
    for spec in invocation.get("parameters", []):
        value_type = spec.get("value_type") if isinstance(spec, dict) else None
        _collect_structs(value_type, struct_specs)
    result_helpers = ""
    codecs = (
        "    // Registry of input-side node references backing the clone/identity\n"
        "    // checks for graph, random_list, and alias_list returns: the judge\n"
        "    // compares row data, so only the wrapper can catch a solution that\n"
        "    // returns the input structure itself.\n"
        "    static inputNodes = new Set<unknown>();\n"
    )
    if "list" in structs:
        codecs += (
            "    linkedList(): ListNode | null {\n"
            "        if (this.data[this.offset++] === 0) return null;\n"
            "        const length = this.uint32();\n"
            "        let head: ListNode | null = null, current: ListNode | null = null;\n"
            "        for (let index = 0; index < length; index++) {\n"
            "            const node = new ListNode(" + item_read + ");\n"
            "            if (current === null) head = node; else current.next = node;\n"
            "            current = node;\n"
            "        }\n"
            "        return head;\n"
            "    }\n"
            "    static listNodeJSON(head: ListNode | null): number[] {\n"
            "        const values: number[] = [];\n"
            "        for (let node = head; node; node = node.next) values.push(node.val);\n"
            "        return values;\n"
            "    }\n"
            "    static collectList(head: ListNode | null): void {\n"
            "        for (let node = head; node; node = node.next) CoderPuzzleReader.inputNodes.add(node);\n"
            "    }\n"
        )
    if "circular_list" in structs:
        codecs += (
            "    circularList(): ListNode | null {\n"
            "        // A circular wire carries the ring's values; the decoder\n"
            "        // closes the ring (tail.next = head) exactly like the\n"
            "        // harness languages, so solutions always see a real ring.\n"
            "        const length = this.uint32();\n"
            "        if (length === 0) return null;\n"
            "        const head = new ListNode(" + item_read + ");\n"
            "        let tail: ListNode = head;\n"
            "        for (let index = 1; index < length; index++) {\n"
            "            tail.next = new ListNode(" + item_read + ");\n"
            "            tail = tail.next;\n"
            "        }\n"
            "        tail.next = head;\n"
            "        return head;\n"
            "    }\n"
            "    static circularListJSON(head: ListNode | null): number[] {\n"
            "        if (head === null) return [];\n"
            "        const values: number[] = [];\n"
            "        let node: ListNode | null = head;\n"
            "        for (let bound = 0; bound < (1 << 20); bound++) {\n"
            "            values.push(node.val);\n"
            "            node = node.next;\n"
            "            if (node === head) return values;\n"
            "            if (node === null) throw new Error(\"Circular list is not closed\");\n"
            "        }\n"
            "        throw new Error(\"Circular list exceeds the walk bound\");\n"
            "    }\n"
        )
    if "tree" in structs or "special_tree" in structs:
        codecs += (
            "    tree(): TreeNode | null {\n"
            "        const length = this.uint32();\n"
            "        const slots: Array<number | null> = [];\n"
            "        for (let index = 0; index < length; index++) {\n"
            "            slots.push(this.data[this.offset++] === 1 ? " + item_read + " : null);\n"
            "        }\n"
            "        if (length === 0 || slots[0] === null) return null;\n"
            "        const root = new TreeNode(slots[0]!);\n"
            "        const queue: TreeNode[] = [root];\n"
            "        let index = 1;\n"
            "        while (queue.length > 0 && index < length) {\n"
            "            const node = queue.shift()!;\n"
            "            if (index < length) {\n"
            "                if (slots[index] !== null) { node.left = new TreeNode(slots[index]!); queue.push(node.left); }\n"
            "                index++;\n"
            "            }\n"
            "            if (index < length) {\n"
            "                if (slots[index] !== null) { node.right = new TreeNode(slots[index]!); queue.push(node.right); }\n"
            "                index++;\n"
            "            }\n"
            "        }\n"
            "        return root;\n"
            "    }\n"
            "    static treeNodeJSON(root: TreeNode | null): Array<number | null> {\n"
            "        if (root === null) return [];\n"
            "        const values: Array<number | null> = [];\n"
            "        const queue: Array<TreeNode | null> = [root];\n"
            "        while (queue.length > 0) {\n"
            "            const node = queue.shift()!;\n"
            "            if (node === null) { values.push(null); continue; }\n"
            "            values.push(node.val);\n"
            "            queue.push(node.left, node.right);\n"
            "        }\n"
            "        while (values.length > 0 && values[values.length - 1] === null) values.pop();\n"
            "        return values;\n"
            "    }\n"
        )
    if "nary_tree" in structs or "nary_tree_nodes" in structs or "nary_tree_ref" in structs:
        # The DOM lib declares a global `Node`; the module marker at the top
        # of the assembled file shadows it for the whole compilation unit.
        codecs += (
            "    naryTree(): Node | null {\n"
            "        const length = this.uint32();\n"
            "        const slots: Array<number | null> = [];\n"
            "        for (let index = 0; index < length; index++) {\n"
            "            slots.push(this.data[this.offset++] === 1 ? " + item_read + " : null);\n"
            "        }\n"
            "        if (length === 0 || slots[0] === null) return null;\n"
            "        const root = new Node(slots[0]!);\n"
            "        const queue: Node[] = [root];\n"
            "        // Display wire: slot 1 closes the root group, then every\n"
            "        // node's children run until that node's own separator slot.\n"
            "        // Tolerate the marker's absence for hand-written inputs.\n"
            "        let index = length > 1 && slots[1] !== null ? 1 : 2;\n"
            "        while (queue.length > 0 && index < slots.length) {\n"
            "            const node = queue.shift()!;\n"
            "            while (index < slots.length && slots[index] !== null) {\n"
            "                const child = new Node(slots[index]!);\n"
            "                node.children.push(child);\n"
            "                queue.push(child);\n"
            "                index++;\n"
            "            }\n"
            "            if (index < slots.length) index++;  // group separator\n"
            "        }\n"
            "        return root;\n"
            "    }\n"
            "    static naryTreeJSON(root: Node | null): Array<number | null> {\n"
            "        // Display wire: root value, the marker closing the root\n"
            "        // group, then each node's children followed by its own\n"
            "        // marker; trailing markers are trimmed.\n"
            "        if (root === null) return [];\n"
            "        const values: Array<number | null> = [root.val, null];\n"
            "        const queue: Node[] = [root];\n"
            "        while (queue.length > 0) {\n"
            "            const node = queue.shift()!;\n"
            "            for (const child of node.children) {\n"
            "                values.push(child.val);\n"
            "                queue.push(child);\n"
            "            }\n"
            "            values.push(null);\n"
            "        }\n"
            "        while (values.length > 0 && values[values.length - 1] === null) values.pop();\n"
            "        return values;\n"
            "    }\n"
        )
    if "quad_tree" in structs:
        codecs += (
            "    quadTree(): QuadNode | null {\n"
            "        this.need(1);\n"
            "        if (this.data[this.offset++] === 0) return null;\n"
            "        this.need(1);\n"
            "        const isLeaf = this.data[this.offset++] === 1;\n"
            "        this.need(1);\n"
            "        const val = this.data[this.offset++] === 1;\n"
            "        const node = new QuadNode(val, isLeaf);\n"
            "        if (!isLeaf) {\n"
            "            node.topLeft = this.quadTree();\n"
            "            node.topRight = this.quadTree();\n"
            "            node.bottomLeft = this.quadTree();\n"
            "            node.bottomRight = this.quadTree();\n"
            "        }\n"
            "        return node;\n"
            "    }\n"
            "    static quadTreeJSON(node: QuadNode | null): any {\n"
            "        // LC display wire: one flat preorder list of [isLeaf,\n"
            "        // val] pairs; a non-leaf's val normalizes to 0.\n"
            "        if (node === null) return null;\n"
            "        const rows: any[] = [];\n"
            "        const walk = (node: QuadNode | null): void => {\n"
            "            if (node === null) { rows.push(null); return; }\n"
            "            if (node.isLeaf) { rows.push([1, node.val ? 1 : 0]); return; }\n"
            "            rows.push([0, 0]);\n"
            "            walk(node.topLeft);\n"
            "            walk(node.topRight);\n"
            "            walk(node.bottomLeft);\n"
            "            walk(node.bottomRight);\n"
            "        };\n"
            "        walk(node);\n"
            "        return rows;\n"
            "    }\n"
        )
    if "nested" in structs:
        codecs += (
            "    nested(): NestedInteger {\n"
            "        this.need(1);\n"
            "        const tag = this.data[this.offset++];\n"
            "        if (tag === 1) return new NestedInteger(this.int32());\n"
            "        if (tag !== 2) throw new Error(\"Invalid nested tag\");\n"
            "        const length = this.uint32();\n"
            "        const value = new NestedInteger();\n"
            "        for (let index = 0; index < length; index++) value.add(this.nested());\n"
            "        return value;\n"
            "    }\n"
            "    static nestedJSON(value: NestedInteger): any {\n"
            "        if (value.isInteger()) return value.getInteger();\n"
            "        return value.getList().map(CoderPuzzleReader.nestedJSON);\n"
            "    }\n"
        )
    if "next_tree" in structs:
        codecs += (
            "    nextTree(): NodeWithNext | null {\n"
            "        const length = this.uint32();\n"
            "        const slots: Array<number | null> = [];\n"
            "        for (let index = 0; index < length; index++) {\n"
            "            slots.push(this.data[this.offset++] === 1 ? " + item_read + " : null);\n"
            "        }\n"
            "        if (length === 0 || slots[0] === null) return null;\n"
            "        const root = new NodeWithNext(slots[0]!);\n"
            "        const queue: NodeWithNext[] = [root];\n"
            "        let index = 1;\n"
            "        while (queue.length > 0 && index < slots.length) {\n"
            "            const node = queue.shift()!;\n"
            "            if (index < slots.length) {\n"
            "                if (slots[index] !== null) { node.left = new NodeWithNext(slots[index]!); node.left.parent = node; queue.push(node.left); }\n"
            "                index++;\n"
            "            }\n"
            "            if (index < slots.length) {\n"
            "                if (slots[index] !== null) { node.right = new NodeWithNext(slots[index]!); node.right.parent = node; queue.push(node.right); }\n"
            "                index++;\n"
            "            }\n"
            "        }\n"
            "        return root;\n"
            "    }\n"
            "    static nextTreeJSON(root: NodeWithNext | null): Array<number | null> {\n"
            "        // LC display wire: values with one null marker between\n"
            "        // adjacent levels; the walk advances to the first child\n"
            "        // found anywhere in the level (left, else right) so\n"
            "        // imperfect trees serialize too.\n"
            "        const values: Array<number | null> = [];\n"
            "        let level = root;\n"
            "        while (level !== null) {\n"
            "            let nextLevel: NodeWithNext | null = null;\n"
            "            for (let node = level; node; node = node.next) {\n"
            "                values.push(node.val);\n"
            "                if (nextLevel === null) {\n"
            "                    if (node.left) nextLevel = node.left;\n"
            "                    else if (node.right) nextLevel = node.right;\n"
            "                }\n"
            "            }\n"
            "            values.push(null);\n"
            "            level = nextLevel;\n"
            "        }\n"
            "        while (values.length > 0 && values[values.length - 1] === null) values.pop();\n"
            "        return values;\n"
            "    }\n"
        )
    if "doubly_circular" in structs:
        codecs += (
            "    doublyCircular(): NodeWithNext | null {\n"
            "        // LC 426: left is prev, right is next; read the ring open\n"
            "        // and verify every back-link on the way out.\n"
            "        const length = this.uint32();\n"
            "        if (length === 0) return null;\n"
            "        const head = new NodeWithNext(" + item_read + ");\n"
            "        let tail: NodeWithNext = head;\n"
            "        for (let index = 1; index < length; index++) {\n"
            "            tail.right = new NodeWithNext(" + item_read + ");\n"
            "            tail.right.left = tail;\n"
            "            tail = tail.right;\n"
            "        }\n"
            "        return head;\n"
            "    }\n"
            "    static doublyCircularJSON(head: NodeWithNext | null): number[] {\n"
            "        if (head === null) return [];\n"
            "        const values: number[] = [];\n"
            "        let previous: NodeWithNext | null = null;\n"
            "        let node: NodeWithNext | null = head;\n"
            "        for (let bound = 0; bound < (1 << 20); bound++) {\n"
            "            // head's own back-link is the tail, verified when the\n"
            "            // walk closes below.\n"
            "            if (previous !== null && node.left !== previous) {\n"
            "                throw new Error(\"Doubly linked list is not properly linked\");\n"
            "            }\n"
            "            values.push(node.val);\n"
            "            previous = node;\n"
            "            node = node.right;\n"
            "            if (node === head) {\n"
            "                if (head.left !== previous) throw new Error(\"Doubly linked list is not properly linked\");\n"
            "                return values;\n"
            "            }\n"
            "            if (node === null) throw new Error(\"Doubly linked list is not closed\");\n"
            "        }\n"
            "        throw new Error(\"Doubly linked list exceeds the walk bound\");\n"
            "    }\n"
        )
    if "multi_list" in structs:
        codecs += (
            "    multiList(): MultiListNode | null {\n"
            "        // One chain: u32 n, then per node the value, a child flag,\n"
            "        // and the flagged child's own chain. Every chain (top and\n"
            "        // nested) gets its prev links set.\n"
            "        const length = this.uint32();\n"
            "        let head: MultiListNode | null = null;\n"
            "        let tail: MultiListNode | null = null;\n"
            "        for (let index = 0; index < length; index++) {\n"
            "            const node = new MultiListNode(this.int32());\n"
            "            if (tail !== null) { tail.next = node; node.prev = tail; } else head = node;\n"
            "            tail = node;\n"
            "            this.need(1);\n"
            "            if (this.data[this.offset++] === 1) node.child = this.multiList();\n"
            "        }\n"
            "        return head;\n"
            "    }\n"
            "    static multiListJSON(head: MultiListNode | null): number[] {\n"
            "        // A flattened result must be a clean doubly chain: every\n"
            "        // prev back-link set, no child left.\n"
            "        const values: number[] = [];\n"
            "        let previous: MultiListNode | null = null;\n"
            "        let node: MultiListNode | null = head;\n"
            "        let bound = 0;\n"
            "        for (; node !== null && bound < (1 << 20); bound++) {\n"
            "            if (node.prev !== previous || node.child !== null) {\n"
            "                throw new Error(\"Flattened list is not properly linked\");\n"
            "            }\n"
            "            values.push(node.val);\n"
            "            previous = node;\n"
            "            node = node.next;\n"
            "        }\n"
            "        if (node !== null) throw new Error(\"Flattened list exceeds the walk bound\");\n"
            "        return values;\n"
            "    }\n"
        )
    if "graph" in structs:
        # The class is the using problem's provided/ source (LC 133); the
        # placeholder becomes the manifest's class name below.
        codecs += (
            "    graph(): @@GRAPH_CLASS@@ | null {\n"
            "        const count = this.uint32();\n"
            "        if (count === 0) return null;\n"
            "        const nodes: @@GRAPH_CLASS@@[] = [];\n"
            "        for (let index = 0; index < count; index++) nodes.push(new @@GRAPH_CLASS@@(index + 1));\n"
            "        for (let index = 0; index < count; index++) {\n"
            "            const degree = this.uint32();\n"
            "            for (let neighbor = 0; neighbor < degree; neighbor++) {\n"
            "                const value = this.int32() + 1;\n"
            "                if (value < 1 || value > count) throw new Error(\"Graph neighbor is out of range\");\n"
            "                nodes[index].neighbors.push(nodes[value - 1]);\n"
            "            }\n"
            "        }\n"
            "        return nodes[0];\n"
            "    }\n"
            "    static collectGraph(root: @@GRAPH_CLASS@@ | null): void {\n"
            "        if (root === null) return;\n"
            "        const queue: @@GRAPH_CLASS@@[] = [root];\n"
            "        for (let index = 0; index < queue.length; index++) {\n"
            "            const node = queue[index];\n"
            "            if (queue.indexOf(node) !== index) continue;\n"
            "            CoderPuzzleReader.inputNodes.add(node);\n"
            "            for (const neighbor of node.neighbors) queue.push(neighbor);\n"
            "        }\n"
            "    }\n"
            "    static graphJSON(root: @@GRAPH_CLASS@@ | null): number[][] {\n"
            "        // Rows ordered by node value; neighbor order is normalized\n"
            "        // (sorted) since LC treats adjacency order as irrelevant.\n"
            "        const visited: @@GRAPH_CLASS@@[] = [];\n"
            "        if (root !== null) {\n"
            "            const queue: @@GRAPH_CLASS@@[] = [root];\n"
            "            for (let index = 0; index < queue.length; index++) {\n"
            "                const node = queue[index];\n"
            "                if (queue.indexOf(node) !== index) continue;\n"
            "                visited.push(node);\n"
            "                for (const neighbor of node.neighbors) queue.push(neighbor);\n"
            "            }\n"
            "        }\n"
            "        for (const node of visited) {\n"
            "            if (CoderPuzzleReader.inputNodes.has(node)) {\n"
            "                throw new Error(\"Returned graph shares nodes with the input graph\");\n"
            "            }\n"
            "        }\n"
            "        visited.sort((a, b) => a.val - b.val);\n"
            "        return visited.map((node) =>\n"
            "            node.neighbors.map((neighbor) => neighbor.val).sort((a, b) => a - b));\n"
            "    }\n"
        )
    if "random_list" in structs:
        codecs += (
            "    randomList(): @@RANDOM_CLASS@@ | null {\n"
            "        const count = this.uint32();\n"
            "        if (count === 0) return null;\n"
            "        const nodes: @@RANDOM_CLASS@@[] = [];\n"
            "        const targets: number[] = [];\n"
            "        // Each row carries [val, random] together.\n"
            "        for (let index = 0; index < count; index++) {\n"
            "            nodes.push(new @@RANDOM_CLASS@@(this.int32()));\n"
            "            targets.push(this.uint32());\n"
            "        }\n"
            "        for (let index = 0; index + 1 < count; index++) nodes[index].next = nodes[index + 1];\n"
            "        for (let index = 0; index < count; index++) {\n"
            "            if (targets[index] === 0xFFFFFFFF) continue;\n"
            "            if (targets[index] >= count) throw new Error(\"Random pointer target is out of range\");\n"
            "            nodes[index].random = nodes[targets[index]];\n"
            "        }\n"
            "        return nodes[0];\n"
            "    }\n"
            "    static collectRandomList(head: @@RANDOM_CLASS@@ | null): void {\n"
            "        for (let node = head; node; node = node.next) CoderPuzzleReader.inputNodes.add(node);\n"
            "    }\n"
            "    static randomListJSON(head: @@RANDOM_CLASS@@ | null): Array<Array<number | null>> {\n"
            "        const nodes: @@RANDOM_CLASS@@[] = [];\n"
            "        for (let node = head; node; node = node.next) {\n"
            "            if (nodes.indexOf(node) !== -1) throw new Error(\"Random list has a cycle in next\");\n"
            "            nodes.push(node);\n"
            "        }\n"
            "        for (const node of nodes) {\n"
            "            if (CoderPuzzleReader.inputNodes.has(node)) {\n"
            "                throw new Error(\"Returned list shares nodes with the input list\");\n"
            "            }\n"
            "        }\n"
            "        return nodes.map((node) => {\n"
            "            if (node.random === null) return [node.val, null];\n"
            "            const target = nodes.indexOf(node.random);\n"
            "            if (target === -1) throw new Error(\"Random pointer leaves the returned list\");\n"
            "            return [node.val, target];\n"
            "        });\n"
            "    }\n"
        )
    if "doubly_list" in structs or "doubly_list_node" in structs:
        # The class is the using problem's provided/ source (LC 3263/3294
        # ship their own doubly-linked node); the placeholder becomes the
        # manifest's class name below.
        codecs += (
            "    doublyList(): @@DOUBLY_CLASS@@ | null {\n"
            "        // The LC 3263 wire: a plain value array decoding into an\n"
            "        // open chain with both directions wired.\n"
            "        if (this.data[this.offset++] === 0) return null;\n"
            "        const length = this.uint32();\n"
            "        const nodes: @@DOUBLY_CLASS@@[] = [];\n"
            "        for (let index = 0; index < length; index++) nodes.push(new @@DOUBLY_CLASS@@(" + item_read + "));\n"
            "        for (let index = 1; index < length; index++) {\n"
            "            nodes[index - 1].next = nodes[index];\n"
            "            nodes[index].prev = nodes[index - 1];\n"
            "        }\n"
            "        return length > 0 ? nodes[0] : null;\n"
            "    }\n"
            "    static doublyListJSON(head: @@DOUBLY_CLASS@@ | null): number[] {\n"
            "        // The forward walk must agree with every back-link,\n"
            "        // mirroring the doubly_circular invariant on an open chain.\n"
            "        const values: number[] = [];\n"
            "        let previous: @@DOUBLY_CLASS@@ | null = null;\n"
            "        let node: @@DOUBLY_CLASS@@ | null = head;\n"
            "        for (let bound = 0; node !== null && bound < (1 << 20); bound++) {\n"
            "            if (node.prev !== previous) {\n"
            "                throw new Error(\"Doubly linked list is not properly linked\");\n"
            "            }\n"
            "            values.push(node.val);\n"
            "            previous = node;\n"
            "            node = node.next;\n"
            "        }\n"
            "        if (node !== null) throw new Error(\"Doubly linked list exceeds the walk bound\");\n"
            "        return values;\n"
            "    }\n"
        )
    if "doubly_list_node" in structs:
        codecs += (
            "    doublyListNode(): @@DOUBLY_CLASS@@ {\n"
            "        // The LC 3294 wire: the chain plus the (unique) value of\n"
            "        // the node the method receives.\n"
            "        const head = this.doublyList();\n"
            "        const target = " + item_read + ";\n"
            "        for (let node = head; node !== null; node = node.next) {\n"
            "            if (node.val === target) return node;\n"
            "        }\n"
            "        throw new Error(\"doubly_list_node target value is not in the chain\");\n"
            "    }\n"
        )
    if "random_tree" in structs:
        codecs += (
            "    randomTree(): @@RANDOM_TREE_CLASS@@ | null {\n"
            "        // The LC 1485 wire: a binary-tree level order whose\n"
            "        // present slots are [val, randomIndex] rows — random_list's\n"
            "        // index addressing on a tree topology. The index counts\n"
            "        // present nodes in level order, from the root.\n"
            "        const length = this.uint32();\n"
            "        const slots: Array<number | null> = [];\n"
            "        const targets: number[] = [];\n"
            "        for (let index = 0; index < length; index++) {\n"
            "            if (this.data[this.offset++] === 1) {\n"
            "                slots.push(" + item_read + ");\n"
            "                targets.push(this.uint32());\n"
            "            } else {\n"
            "                slots.push(null);\n"
            "                targets.push(0xFFFFFFFF);\n"
            "            }\n"
            "        }\n"
            "        if (length === 0 || slots[0] === null) return null;\n"
            "        const root = new @@RANDOM_TREE_CLASS@@(slots[0]!);\n"
            "        const order: @@RANDOM_TREE_CLASS@@[] = [root];\n"
            "        const pending: Array<[@@RANDOM_TREE_CLASS@@, number]> = [[root, targets[0]]];\n"
            "        const queue: @@RANDOM_TREE_CLASS@@[] = [root];\n"
            "        let index = 1;\n"
            "        while (queue.length > 0 && index < slots.length) {\n"
            "            const node = queue.shift()!;\n"
            "            if (index < slots.length) {\n"
            "                if (slots[index] !== null) {\n"
            "                    const child = new @@RANDOM_TREE_CLASS@@(slots[index]!);\n"
            "                    node.left = child;\n"
            "                    order.push(child);\n"
            "                    pending.push([child, targets[index]]);\n"
            "                    queue.push(child);\n"
            "                }\n"
            "                index++;\n"
            "            }\n"
            "            if (index < slots.length) {\n"
            "                if (slots[index] !== null) {\n"
            "                    const child = new @@RANDOM_TREE_CLASS@@(slots[index]!);\n"
            "                    node.right = child;\n"
            "                    order.push(child);\n"
            "                    pending.push([child, targets[index]]);\n"
            "                    queue.push(child);\n"
            "                }\n"
            "                index++;\n"
            "            }\n"
            "        }\n"
            "        for (const [node, target] of pending) {\n"
            "            if (target === 0xFFFFFFFF) continue;\n"
            "            if (target >= order.length) throw new Error(\"Random pointer target is out of range\");\n"
            "            node.random = order[target];\n"
            "        }\n"
            "        return root;\n"
            "    }\n"
            "    static collectRandomTree(root: @@RANDOM_TREE_CLASS@@ | null): void {\n"
            "        // The input-side registry backing random_tree's clone check.\n"
            "        if (root === null) return;\n"
            "        const queue: @@RANDOM_TREE_CLASS@@[] = [root];\n"
            "        for (let index = 0; index < queue.length; index++) {\n"
            "            const node = queue[index];\n"
            "            if (queue.indexOf(node) !== index) continue;\n"
            "            CoderPuzzleReader.inputNodes.add(node);\n"
            "            if (node.left !== null) queue.push(node.left);\n"
            "            if (node.right !== null) queue.push(node.right);\n"
            "        }\n"
            "    }\n"
            "    static randomTreeJSON(root: @@RANDOM_TREE_CLASS@@ | null): Array<Array<number | null> | null> {\n"
            "        // Level order rows like the input side (absent slots stay\n"
            "        // null); the clone check forbids returning (part of) the\n"
            "        // input tree, and every random pointer must land inside the\n"
            "        // returned tree.\n"
            "        if (root === null) return [];\n"
            "        const order: Array<@@RANDOM_TREE_CLASS@@ | null> = [];\n"
            "        const queue: Array<@@RANDOM_TREE_CLASS@@ | null> = [root];\n"
            "        while (queue.length > 0) {\n"
            "            const node = queue.shift()!;\n"
            "            if (node === null) { order.push(null); continue; }\n"
            "            if (order.indexOf(node) !== -1) {\n"
            "                throw new Error(\"Random tree repeats a node in level order\");\n"
            "            }\n"
            "            order.push(node);\n"
            "            queue.push(node.left, node.right);\n"
            "        }\n"
            "        while (order.length > 0 && order[order.length - 1] === null) order.pop();\n"
            "        for (const node of order) {\n"
            "            if (node !== null && CoderPuzzleReader.inputNodes.has(node)) {\n"
            "                throw new Error(\"Returned tree shares nodes with the input tree\");\n"
            "            }\n"
            "        }\n"
            "        // Random indices address present nodes in level order — the\n"
            "        // same convention the decode side uses — so placeholder\n"
            "        // slots shift neither the numbering nor the walk below.\n"
            "        const present: @@RANDOM_TREE_CLASS@@[] = order.filter((node) => node !== null);\n"
            "        return order.map((node): Array<number | null> | null => {\n"
            "            if (node === null) return null;\n"
            "            if (node.random === null) return [node.val, null];\n"
            "            const target = present.indexOf(node.random);\n"
            "            if (target === -1) throw new Error(\"Random pointer leaves the returned tree\");\n"
            "            return [node.val, target];\n"
            "        });\n"
            "    }\n"
        )
    if "special_tree" in structs:
        codecs += (
            "    specialTree(): TreeNode | null {\n"
            "        // The LC 2773 wire: a binary-tree display whose leaves\n"
            "        // b1..bk (in increasing value order) are ring-wired left\n"
            "        // to the previous and right to the next leaf — the special\n"
            "        // property the statement grants, which the display cannot\n"
            "        // carry. k === 1 self-loops both ways.\n"
            "        const root = this.tree();\n"
            "        if (root === null) return null;\n"
            "        const leaves: TreeNode[] = [];\n"
            "        const queue: TreeNode[] = [root];\n"
            "        for (let index = 0; index < queue.length; index++) {\n"
            "            const node = queue[index];\n"
            "            if (node.left === null && node.right === null) leaves.push(node);\n"
            "            else {\n"
            "                if (node.left !== null) queue.push(node.left);\n"
            "                if (node.right !== null) queue.push(node.right);\n"
            "            }\n"
            "        }\n"
            "        leaves.sort((a, b) => a.val - b.val);\n"
            "        const count = leaves.length;\n"
            "        for (let position = 0; position < count; position++) {\n"
            "            leaves[position].left = leaves[(position - 1 + count) % count];\n"
            "            leaves[position].right = leaves[(position + 1) % count];\n"
            "        }\n"
            "        return root;\n"
            "    }\n"
        )
    if "nary_tree_nodes" in structs:
        codecs += (
            "    naryTreeNodes(): Node[] {\n"
            "        // The LC 1506 wire: the n-ary display decoded and handed\n"
            "        // over as the list of its nodes (level order — the\n"
            "        // statement grants the solution an arbitrary permutation).\n"
            "        const root = this.naryTree();\n"
            "        if (root === null) return [];\n"
            "        const nodes: Node[] = [root];\n"
            "        for (let cursor = 0; cursor < nodes.length; cursor++) {\n"
            "            for (const child of nodes[cursor].children) nodes.push(child);\n"
            "        }\n"
            "        return nodes;\n"
            "    }\n"
        )
    if "nary_tree_ref" in structs:
        codecs += (
            "    naryTreeRef(aliased: Node | null): Node {\n"
            "        // The LC 1516 wire: an integer naming a node of the\n"
            "        // already-decoded aliased tree; the argument is that exact\n"
            "        // node object (shared identity), found by its unique value.\n"
            "        const target = " + item_read + ";\n"
            "        const stack: Array<Node | null> = [aliased];\n"
            "        while (stack.length > 0) {\n"
            "            const node = stack.pop()!;\n"
            "            if (node === null) continue;\n"
            "            if (node.val === target) return node;\n"
            "            for (let index = node.children.length - 1; index >= 0; index--) {\n"
            "                stack.push(node.children[index]);\n"
            "            }\n"
            "        }\n"
            "        throw new Error(\"nary_tree_ref target value is not in the aliased tree\");\n"
            "    }\n"
        )
    if any(_uses_json(spec) for spec in
           [parameter.get("value_type") for parameter in invocation.get("parameters", [])]
           + [invocation.get("return_type")]):
        codecs += (
            "    json(): any {\n"
            "        // The generic any-shaped value: length-prefixed compact\n"
            "        // JSON passed through parsed, and returned values pass\n"
            "        // back out as-is (already JSON).\n"
            "        return JSON.parse(this.string());\n"
            "    }\n"
        )
    if "alias_list" in structs:
        codecs += (
            "    static aliasListJSON(node: ListNode | null): number[] {\n"
            "        // LC 160: the intersection is by identity — the result must\n"
            "        // be a node taken from the input lists, and the wire is the\n"
            "        // shared tail's values.\n"
            "        if (node === null) return [];\n"
            "        if (!CoderPuzzleReader.inputNodes.has(node)) {\n"
            "            throw new Error(\"Returned node is not part of the input lists\");\n"
            "        }\n"
            "        const values: number[] = [];\n"
            "        for (let walk = node; walk; walk = walk.next) values.push(walk.val);\n"
            "        return values;\n"
            "    }\n"
        )
    for name, spec in sorted(struct_specs.items()):
        # Construct the manifest-named class supplied by this bundle's
        # provided/ source; the judge contributes only the decoder.
        fields = spec.get("fields") or []
        reads = ", ".join(
            _read_expression(field["value_type"], "this") for field in fields
        )
        codecs += (
            f"    read{name}(): {name} {{\n"
            f"        return new {name}({reads});\n"
            "    }\n"
        )
    return_type = invocation.get("return_type", {})
    # Array-of-node result helpers deliberately cover only these three kinds
    # (javascript.py's _ARRAY_RESULT_HELPERS covers twelve): TypeScript
    # type-checks unreachable helpers against the bundle's own provided/
    # classes, so each additional kind needs a guarded, typed renderer.
    if return_type.get("kind") == "array":
        item_kind = (return_type.get("items") or {}).get("kind")
        if item_kind == "linked_list" and "list" in structs:
            result_helpers += (
                "function coderpuzzleListNodeArrayJSON(values: Array<ListNode | null>): Array<Array<number>> {\n"
                "    return values.map((value) => CoderPuzzleReader.listNodeJSON(value));\n"
                "}\n\n"
            )
        if item_kind == "binary_tree" and "tree" in structs:
            result_helpers += (
                "function coderpuzzleTreeNodeArrayJSON(values: Array<TreeNode | null>): Array<Array<number | null>> {\n"
                "    return values.map((value) => CoderPuzzleReader.treeNodeJSON(value));\n"
                "}\n\n"
            )
        if item_kind == "circular_list" and "circular_list" in structs:
            result_helpers += (
                "function coderpuzzleCircularArrayJSON(values: Array<ListNode | null>): Array<Array<number>> {\n"
                "    return values.map((value) => CoderPuzzleReader.circularListJSON(value));\n"
                "}\n\n"
            )
    codecs = codecs.replace("@@GRAPH_CLASS@@", graph_class).replace("@@RANDOM_CLASS@@", random_class)
    codecs = codecs.replace("@@DOUBLY_CLASS@@", doubly_class).replace("@@RANDOM_TREE_CLASS@@", random_tree_class)
    return result_helpers, codecs


def _result_wrapper(invocation: dict[str, Any]) -> str:
    return_type = invocation.get("return_type", {})
    kind = return_type.get("kind")
    if kind == "linked_list":
        return "CoderPuzzleReader.listNodeJSON"
    if kind == "binary_tree":
        return "CoderPuzzleReader.treeNodeJSON"
    if kind == "nary_tree":
        return "CoderPuzzleReader.naryTreeJSON"
    if kind == "quad_tree":
        return "CoderPuzzleReader.quadTreeJSON"
    if kind == "nested":
        return "CoderPuzzleReader.nestedJSON"
    if kind == "next_tree":
        return "CoderPuzzleReader.nextTreeJSON"
    if kind == "circular_list":
        return "CoderPuzzleReader.circularListJSON"
    if kind == "doubly_circular":
        return "CoderPuzzleReader.doublyCircularJSON"
    if kind == "multi_list":
        return "CoderPuzzleReader.multiListJSON"
    if kind == "alias_list":
        return "CoderPuzzleReader.aliasListJSON"
    if kind == "graph":
        return "CoderPuzzleReader.graphJSON"
    if kind == "random_list":
        return "CoderPuzzleReader.randomListJSON"
    if kind == "doubly_list":
        return "CoderPuzzleReader.doublyListJSON"
    if kind == "random_tree":
        return "CoderPuzzleReader.randomTreeJSON"
    if kind == "array":
        item_kind = (return_type.get("items") or {}).get("kind")
        if item_kind == "linked_list":
            return "coderpuzzleListNodeArrayJSON"
        if item_kind == "binary_tree":
            return "coderpuzzleTreeNodeArrayJSON"
        if item_kind == "circular_list":
            return "coderpuzzleCircularArrayJSON"
    return "coderpuzzleIdentity"


class TypeScriptExecutor(CompiledExecutor):
    language = "typescript"
    address_space_overhead_mb = 1536
    max_processes = 32
    compiler_memory_mb = 2048
    compiler_path = "/usr/local/bin/tsc"
    node_path = "/usr/local/bin/node"
    benchmark_command = (node_path, "/runner/benchmarks/typescript.js")
    reference_benchmark_ms = 40.0

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
            from .js_design import prepare_design
            return prepare_design(self, job_root, scratch, code, invocation, assembly, is_typescript=True)
        if invocation.get("type") == "interactive":
            from .js_interactive import prepare_interactive
            return prepare_interactive(self, job_root, scratch, code, invocation, assembly, is_typescript=True)
        parameters, _, method = function_signature(invocation, self.language)
        # Type declarations arrive entirely as source from the problem's
        # own provided/ (docs/CODECS.md: every wire kind names the class
        # its bundle must ship) — the judge never generates a fallback
        # class definition of its own; it contributes only wire codecs
        # and result-conversion helpers.
        assembly_prelude = "".join(
            content + "\n"
            for name, content in sorted((assembly or {}).get("provided", {}).items())
            if name.endswith(".ts")
        )
        struct_helpers, struct_codecs = _struct_codecs(invocation)
        result_wrapper = _result_wrapper(invocation)
        # Alias splices need the aliased list's nodes; clone checks need
        # every input node registered — read the parameters with that
        # bookkeeping inline (one registration per list-shaped parameter).
        alias_sources = sorted(
            {
                spec["alias"]
                for spec in parameters
                if spec.get("kind") == "alias_list"
            }
        )
        reader_item = (
            "coderpuzzleReader.int64()"
            if struct_item_spec(invocation).get("bits", 32) == 64
            else "coderpuzzleReader.int32()"
        )
        collectors = {
            "linked_list": "collectList",
            "graph": "collectGraph",
            "random_list": "collectRandomList",
            "random_tree": "collectRandomTree",
        }

        def declaration(index: int, spec: dict[str, Any]) -> str:
            if spec.get("kind") == "nary_tree_ref":
                # A node of an earlier n-ary tree, named by its (unique)
                # value: the reader resolves it inside the aliased tree the
                # way an alias_list splices onto its earlier list.
                return (
                    f"    const coderpuzzleArg{index} = "
                    f"coderpuzzleReader.naryTreeRef(coderpuzzleArg{spec['alias']});"
                )
            if spec.get("kind") == "alias_list":
                aliased = f"coderpuzzleArg{spec['alias']}Nodes"
                lines = [
                    f"    const coderpuzzleArg{index} = (() => {{",
                    "        const count = coderpuzzleReader.uint32();",
                    "        let head: ListNode | null = null, current: ListNode | null = null;",
                    "        const prefix: ListNode[] = [];",
                    "        for (let step = 0; step < count; step++) {",
                    f"            const node = new ListNode({reader_item});",
                    "            if (current === null) head = node; else current.next = node;",
                    "            current = node;",
                    "            prefix.push(node);",
                    "        }",
                    "        const spliceAt = coderpuzzleReader.uint32();",
                    f"        if (spliceAt < {aliased}.length) {{",
                    "            // Real shared nodes: the prefix's last node (or the",
                    "            // head when the prefix is empty) joins the aliased",
                    "            // list at the splice point.",
                    f"            if (current === null) head = {aliased}[spliceAt];",
                    f"            else current.next = {aliased}[spliceAt];",
                    "        }",
                    "        for (const node of prefix) CoderPuzzleReader.inputNodes.add(node);",
                    "        return head;",
                    "    })();",
                ]
                return "\n".join(lines)
            lines = [f"    const coderpuzzleArg{index} = {_read_expression(spec)};"]
            if spec.get("kind") == "linked_list" and index in alias_sources:
                lines.append(f"    const coderpuzzleArg{index}Nodes: ListNode[] = [];")
                lines.append(
                    f"    for (let node = coderpuzzleArg{index}; node; node = node.next) coderpuzzleArg{index}Nodes.push(node);"
                )
            collector = collectors.get(spec.get("kind"))
            if collector:
                lines.append(f"    CoderPuzzleReader.{collector}(coderpuzzleArg{index});")
            return "\n".join(lines)

        declarations = "\n".join(
            declaration(index, spec) for index, spec in enumerate(parameters)
        )
        arguments = ", ".join(f"coderpuzzleArg{index}" for index in range(len(parameters)))
        wrapper = textwrap.dedent(
            f"""
            declare const require: (name: string) => any;
            declare const process: any;

            class CoderPuzzleReader {{
                private offset = 0;
                constructor(private readonly data: any) {{}}
                private need(count: number): void {{
                    if (this.offset + count > this.data.length) throw new Error("Truncated judge input");
                }}
                uint32(): number {{ this.need(4); const value = this.data.readUInt32BE(this.offset); this.offset += 4; return value; }}
                int32(): number {{ this.need(4); const value = this.data.readInt32BE(this.offset); this.offset += 4; return value; }}
                int64(): number {{
                    this.need(8);
                    const value = Number(this.data.readBigInt64BE(this.offset));
                    this.offset += 8;
                    if (!Number.isSafeInteger(value)) throw new Error("64-bit input exceeds TypeScript's safe integer range");
                    return value;
                }}
                number(): number {{ this.need(8); const value = this.data.readDoubleBE(this.offset); this.offset += 8; return value; }}
                boolean(): boolean {{ this.need(1); const value = this.data[this.offset++]; if (value > 1) throw new Error("Invalid boolean input"); return value === 1; }}
                string(): string {{ const length = this.uint32(); this.need(length); const value = this.data.toString("utf8", this.offset, this.offset + length); this.offset += length; return value; }}
                array<T>(read: () => T): T[] {{ const length = this.uint32(); const values: T[] = []; for (let index = 0; index < length; index++) values.push(read()); return values; }}
{struct_codecs}                finished(): void {{ if (this.offset !== this.data.length) throw new Error("Trailing judge input"); }}
            }}
            function coderpuzzleIdentity(value: any) {{ return value; }}
            // JSON.stringify renders integer doubles beyond 2^53 in exponent
            // notation ("4.611686018427388e+18"), which loses the exact value
            // when the judge parses it back. Emit such integers as exact
            // decimal digits instead — BigInt(value) is exact whenever the
            // double is an integer (Number.isInteger above guarantees it).
            function coderpuzzleSerialize(value: any): string {{
                if (value === undefined) return "null";
                if (typeof value === "number") {{
                    if (Number.isInteger(value) && !Number.isSafeInteger(value)) return BigInt(value).toString();
                    return JSON.stringify(value);
                }}
                if (value !== null && typeof value === "object") {{
                    if (Array.isArray(value)) return "[" + value.map(coderpuzzleSerialize).join(",") + "]";
                    const entries = Object.entries(value).map(([key, item]) => JSON.stringify(key) + ":" + coderpuzzleSerialize(item));
                    return "{{" + entries.join(",") + "}}";
                }}
                return JSON.stringify(value);
            }}

            function coderpuzzleEmit(line: string) {{
                try {{ require("fs").writeSync(63, line + "\\n"); }}
                catch (error) {{ process.stdout.write(line + "\\n"); }}
            }}
            (() => {{
                try {{
                    const coderpuzzleReader = new CoderPuzzleReader(require("fs").readFileSync(0));
            {declarations}
                    coderpuzzleReader.finished();
                    const coderpuzzleActual = {result_wrapper}({method}({arguments}));
                    const coderpuzzleEncoded = coderpuzzleSerialize(coderpuzzleActual);
                    if (typeof coderpuzzleEncoded !== "string") throw new Error("Return value is not JSON serializable");
                    coderpuzzleEmit(`__CODERPUZZLE_RESULT__{{"status":"completed","actual":${{coderpuzzleEncoded}}}}`);
                }} catch (error) {{
                    const message = error instanceof Error ? `${{error.name}}: ${{error.message}}` : String(error);
                    coderpuzzleEmit(`__CODERPUZZLE_RESULT__{{"status":"runtime_error","error":${{JSON.stringify(message.slice(0, 4096))}}}}`);
                }}
            }})();
            """
        )
        source_path = job_root / "main.ts"
        output_path = job_root / "main.js"
        # The module marker keeps the whole file (assembly sources included)
        # one compilation unit whose top-level classes are plainly visible to
        # the submission — no imports — while shadowing same-name DOM globals
        # (lib.dom's `Node`) that would otherwise collide with a bare
        # `class Node` in script scope.
        source_path.write_text(
            "export {};\n" + assembly_prelude + struct_helpers + code + "\n" + wrapper,
            encoding="utf-8",
        )
        source_path.chmod(0o444)
        self.compile(
            job_root,
            (
                self.compiler_path,
                "--target",
                "ES2022",
                "--module",
                "commonjs",
                "--lib",
                "ES2022,DOM",
                "--skipLibCheck",
                "--pretty",
                "false",
                "--outDir",
                str(job_root),
                str(source_path),
            ),
            output_path,
            {
                "PATH": "/usr/local/bin:/usr/bin:/bin",
                "HOME": "/nonexistent",
                "TMPDIR": "/tmp",
            },
        )
        return PreparedProgram(
            command=(
                self.node_path,
                "--disable-proto=throw",
                "--no-addons",
                "--max-old-space-size=192",
                "--stack-size=2048",
                str(output_path),
            ),
            environment={
                "PATH": "/usr/local/bin:/usr/bin:/bin",
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
