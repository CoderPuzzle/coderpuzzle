"""LeetCode-style wire codecs — decode/encode logic only, no type
definitions.

Every problem owns its own data structures (docs/CODECS.md documents the
per-kind required class name and shape); the judge knows wire formats and
naming conventions, never definitions. A class-constructing helper here
resolves the class from the SUBMISSION'S OWN assembled module namespace
(``getattr(module, name)``) rather than building a judge-private stand-in
— that module is the bundle's own ``provided/python/`` sources exec'd
ahead of the submission (python_harness._load_solution). A missing or
malformed class fails loudly, naming the class the bundle must provide.

Every non-constructing helper (the ``_serialize_*``/``serialize_*``
functions, and node-collecting walkers like ``graph_nodes``) stays
class-free: it reads only ``.val``/``.next``/... attributes, so it works
on ANY object with the right shape regardless of which class built it.
"""

from collections import deque
from typing import Any


def _cls(module: Any, name: str) -> Any:
    value = getattr(module, name, None)
    if value is None:
        raise ValueError(
            f"This problem's wire needs a {name!r} class; provide it in "
            f"provided/python/ (see docs/CODECS.md for the required shape)"
        )
    return value


# ---- list_node / circular_list / alias_list -------------------------------


def _parse_list_node(module: Any, data: Any) -> Any:
    if not data:
        return None
    ListNode = _cls(module, "ListNode")
    head = ListNode(data[0])
    current = head
    for value in data[1:]:
        current.next = ListNode(value)
        current = current.next
    return head


def _serialize_list_node(head: Any) -> list:
    values = []
    current = head
    while current:
        values.append(current.val)
        current = current.next
    return values


def _parse_circular_list(module: Any, data: Any) -> Any:
    head = _parse_list_node(module, data)
    if head is not None:
        tail = head
        while tail.next is not None:
            tail = tail.next
        tail.next = head
    return head


def _serialize_circular_list(head: Any) -> list:
    if head is None:
        return []
    values = [head.val]
    current = head.next
    for _ in range(1 << 20):
        if current is None:
            raise ValueError("Circular list is not closed")
        if current is head:
            return values
        values.append(current.val)
        current = current.next
    raise ValueError("Circular list exceeds the walk bound")


def parse_alias_list(module: Any, value: Any, head: Any) -> Any:
    """Decode a prefix chain whose tail continues at the aliased list's node
    ``value['splice_at']`` — genuine shared references (the LC 160 wire: the
    prefix is list B's own part, the splice index is where it meets A)."""
    if not isinstance(value, dict) or set(value) != {"values", "splice_at"}:
        raise ValueError("alias_list input must carry values and splice_at")
    values, splice_at = value["values"], value["splice_at"]
    if not isinstance(values, list):
        raise ValueError("alias_list values must be an array")
    if isinstance(splice_at, bool) or not isinstance(splice_at, int) or splice_at < 0:
        raise ValueError("alias_list splice_at must be a non-negative integer")
    node = _parse_list_node(module, values) if values else None
    if node is None:
        return _alias_head(head, splice_at)
    target = _alias_head(head, splice_at)
    tail = node
    while tail.next is not None:
        tail = tail.next
    tail.next = target
    return node


def _alias_head(head: Any, splice_at: int) -> Any:
    target = head
    for _ in range(splice_at):
        if target is None:
            raise ValueError("alias_list splice_at is past the aliased list")
        target = target.next
    return target


def serialize_alias_list(node: Any, head: Any) -> list:
    """The returned node must be a node of the aliased chain (identity); the
    wire form is the values from it to the end. A null return is the LC 160
    no-intersection verdict and serializes as an empty list."""
    if node is None:
        return []
    current = head
    while current is not None:
        if current is node:
            return _serialize_list_node(node)
        current = current.next
    raise ValueError("Returned node is not part of the aliased list")


# ---- binary_tree ------------------------------------------------------


def _parse_tree_node(module: Any, data: Any) -> Any:
    if not data:
        return None
    TreeNode = _cls(module, "TreeNode")
    root = TreeNode(data[0])
    queue = deque([root])
    index = 1
    while queue and index < len(data):
        node = queue.popleft()
        if index < len(data) and data[index] is not None:
            node.left = TreeNode(data[index])
            queue.append(node.left)
        index += 1
        if index < len(data) and data[index] is not None:
            node.right = TreeNode(data[index])
            queue.append(node.right)
        index += 1
    return root


def _serialize_tree_node(root: Any) -> list:
    if root is None:
        return []
    output = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            output.append(None)
            continue
        output.append(node.val)
        queue.extend((node.left, node.right))
    while output and output[-1] is None:
        output.pop()
    return output


def _parse_special_tree(module: Any, data: Any) -> Any:
    """The LC 2773 wire: a binary-tree display whose leaves b1..bk (in
    increasing value order) are ring-wired left to the previous and right
    to the next leaf — the special property the statement grants, which
    the display array itself cannot carry."""
    root = _parse_tree_node(module, data)
    if root is None:
        return None
    leaves = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node.left is None and node.right is None:
            leaves.append(node)
            continue
        for child in (node.left, node.right):
            if child is not None:
                queue.append(child)
    leaves.sort(key=lambda node: node.val)
    for index, leaf in enumerate(leaves):
        leaf.left = leaves[index - 1]
        leaf.right = leaves[(index + 1) % len(leaves)]
    return root


# ---- nary_tree ----------------------------------------------------------


def _parse_nary_tree(module: Any, data: Any) -> Any:
    if not data:
        return None
    Node = _cls(module, "Node")
    root = Node(data[0])
    queue = deque([root])
    index = 2
    while queue and index < len(data):
        parent = queue.popleft()
        while index < len(data) and data[index] is not None:
            child = Node(data[index])
            parent.children.append(child)
            queue.append(child)
            index += 1
        index += 1
    return root


def _serialize_nary_tree(root: Any) -> list:
    if root is None:
        return []
    output = [root.val, None]
    queue = deque([root])
    while queue:
        parent = queue.popleft()
        for child in parent.children:
            output.append(child.val)
            queue.append(child)
        output.append(None)
    while output and output[-1] is None:
        output.pop()
    return output


def _parse_nary_tree_nodes(module: Any, value: Any) -> list:
    """The LC 1506 wire: an n-ary display array decoded and handed over as
    the list of its nodes (level order — any order is faithful, the
    statement grants the solution an arbitrary permutation)."""
    root = _parse_nary_tree(module, value)
    if root is None:
        return []
    nodes = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        nodes.append(node)
        queue.extend(node.children)
    return nodes


def parse_nary_tree_ref(value: Any, root: Any) -> Any:
    """The LC 1516 wire: an integer naming a node of the already-decoded
    aliased tree; the argument is that exact node object (shared
    identity), found by its unique value."""
    stack = [root]
    while stack:
        node = stack.pop()
        if node is None:
            continue
        if node.val == value:
            return node
        stack.extend(reversed(node.children))
    raise ValueError("nary_tree_ref target value is not in the aliased tree")


# ---- quad_tree ------------------------------------------------------------


def _parse_quad_tree(module: Any, data: Any) -> Any:
    """LC display wire: a flat preorder of [isLeaf, val] pairs."""
    if data is None:
        return None
    if not isinstance(data, list):
        raise ValueError("quad_tree input must be a display array")
    QuadNode = _cls(module, "QuadNode")
    cursor = 0

    def parse_node():
        nonlocal cursor
        if cursor >= len(data):
            raise ValueError("quad_tree wire ended without a node")
        pair = data[cursor]
        cursor += 1
        if not isinstance(pair, list) or len(pair) != 2:
            raise ValueError("quad_tree node must be an [isLeaf, val] pair")
        node = QuadNode(bool(pair[1]), bool(pair[0]))
        if not node.isLeaf:
            node.topLeft = parse_node()
            node.topRight = parse_node()
            node.bottomLeft = parse_node()
            node.bottomRight = parse_node()
        return node

    root = parse_node()
    if cursor != len(data):
        raise ValueError("quad_tree wire has trailing entries")
    return root


def _serialize_quad_tree(node: Any) -> Any:
    # A non-leaf's val is the solution's to choose, so both sides normalize
    # it to 0 — the wire never carries an arbitrary internal val.
    if node is None:
        return None
    if node.isLeaf:
        return [[1, 1 if node.val else 0]]
    return [
        [0, 0],
        *_serialize_quad_tree(node.topLeft),
        *_serialize_quad_tree(node.topRight),
        *_serialize_quad_tree(node.bottomLeft),
        *_serialize_quad_tree(node.bottomRight),
    ]


# ---- nested -----------------------------------------------------------


def _parse_nested(module: Any, data: Any) -> Any:
    NestedInteger = _cls(module, "NestedInteger")
    if isinstance(data, int) and not isinstance(data, bool):
        return NestedInteger(data)
    node = NestedInteger()
    for item in data:
        node.add(_parse_nested(module, item))
    return node


def _serialize_nested(node: Any) -> Any:
    if node.isInteger():
        return node.getInteger()
    return [_serialize_nested(item) for item in node.getList()]


# ---- next_tree / doubly_circular -------------------------------------


def _parse_next_tree(module: Any, data: Any) -> Any:
    # Binary-tree level order into NodeWithNext; parents are wired as a
    # courtesy to the LC 510 wire (116/117 solutions ignore them).
    if not data:
        return None
    NodeWithNext = _cls(module, "NodeWithNext")
    root = NodeWithNext(data[0])
    queue = deque([root])
    index = 1
    while queue and index < len(data):
        node = queue.popleft()
        if index < len(data) and data[index] is not None:
            node.left = NodeWithNext(data[index], parent=node)
            queue.append(node.left)
        index += 1
        if index < len(data) and data[index] is not None:
            node.right = NodeWithNext(data[index], parent=node)
            queue.append(node.right)
        index += 1
    return root


def _serialize_next_tree(root: Any) -> list:
    # LC display wire: values with a null marker between adjacent levels,
    # trailing markers trimmed. Each level is read through the
    # solution-populated next chain; the next level starts at the first
    # child found anywhere in this level (left or right — the level's
    # first node need not have a left child).
    output = []
    level = root
    while level is not None:
        next_level = None
        node = level
        while node is not None:
            output.append(node.val)
            if next_level is None:
                if node.left is not None:
                    next_level = node.left
                else:
                    next_level = node.right
            node = node.next
        output.append(None)
        level = next_level
    while output and output[-1] is None:
        output.pop()
    return output


def _serialize_doubly_circular(head: Any) -> list:
    # LC 426 wire (left = prev, right = next): read the ring through right
    # and require every back-link along the way.
    if head is None:
        return []
    values = [head.val]
    previous = head
    current = head.right
    for _ in range(1 << 20):
        if current is None or current.left is not previous:
            raise ValueError("Doubly linked list is not properly linked")
        if current is head:
            break
        values.append(current.val)
        previous = current
        current = current.right
    else:
        raise ValueError("Doubly linked list exceeds the walk bound")
    if head.left is not previous:
        raise ValueError("Doubly linked list is not properly linked")
    return values


# ---- multi_list ---------------------------------------------------------


def _parse_multi_list(module: Any, value: Any) -> Any:
    # A recursive chain object {"values": [...], "children": [null | chain
    # per slot]}: each child chain hangs off exactly one slot, so the LC 430
    # multilevel structure is unambiguous.
    if not isinstance(value, dict) or set(value) != {"values", "children"}:
        raise ValueError("multi_list input must carry values and children")
    values, children = value["values"], value["children"]
    if len(children) != len(values):
        raise ValueError("multi_list children must match values slot for slot")
    MultiListNode = _cls(module, "MultiListNode")
    nodes = []
    for index, val in enumerate(values):
        node = MultiListNode(val)
        child = children[index]
        if child is not None:
            node.child = _parse_multi_list(module, child)
        nodes.append(node)
    for left, right in zip(nodes, nodes[1:]):
        left.next = right
        right.prev = left
    return nodes[0] if nodes else None


def _serialize_multi_list(head: Any) -> list:
    values = []
    node = head
    previous = None
    for _ in range(1 << 20):
        if node is None:
            return values
        if node.prev is not previous or node.child is not None:
            raise ValueError("Flattened list is not properly linked")
        values.append(node.val)
        previous = node
        node = node.next
    raise ValueError("Flattened list exceeds the walk bound")


# ---- doubly_list / doubly_list_node (bundle-named class) -----------------


def _parse_doubly_list(module: Any, values: Any, class_name: str) -> Any:
    """The LC 3263 wire: a plain value array decoding into an open chain
    with both directions wired."""
    if not isinstance(values, list):
        raise ValueError("doubly_list input must be a value array")
    DoublyListNode = _cls(module, class_name)
    nodes = [DoublyListNode(value) for value in values]
    for left, right in zip(nodes, nodes[1:]):
        left.next = right
        right.prev = left
    return nodes[0] if nodes else None


def _serialize_doubly_list(head: Any) -> list:
    # The forward walk must agree with every back-link, mirroring the
    # doubly_circular invariant on an open chain.
    values = []
    node = head
    previous = None
    for _ in range(1 << 20):
        if node is None:
            return values
        if node.prev is not previous:
            raise ValueError("Doubly linked list is not properly linked")
        values.append(node.val)
        previous = node
        node = node.next
    raise ValueError("Doubly linked list exceeds the walk bound")


def _parse_doubly_list_node(module: Any, value: Any, class_name: str) -> Any:
    """The LC 3294 wire: ``{"values": [...], "node": v}`` decodes to the
    chain node whose value is v (values are unique per the constraints)."""
    if not isinstance(value, dict) or set(value) != {"values", "node"}:
        raise ValueError("doubly_list_node input must carry values and node")
    head = _parse_doubly_list(module, value["values"], class_name)
    target = value["node"]
    node = head
    while node is not None:
        if node.val == target:
            return node
        node = node.next
    raise ValueError("doubly_list_node target value is not in the chain")


# ---- random_tree (bundle-named class) ------------------------------------


def _parse_random_tree(module: Any, rows: Any, class_name: str) -> Any:
    """The LC 1485 wire: a binary-tree level order whose present slots are
    ``[val, randomIndex]`` rows — random_list's index addressing on a tree
    topology. The index counts present nodes in level order, from the
    root."""
    if not isinstance(rows, list):
        raise ValueError("random_tree input must be a display array")
    if not rows:
        return None
    if not isinstance(rows[0], list):
        raise ValueError("random_tree root must be a [val, random] row")
    RandomTreeNode = _cls(module, class_name)
    root = RandomTreeNode(rows[0][0])
    order = [root]
    pending = [(root, rows[0][1])]
    queue = deque([root])
    index = 1
    while queue and index < len(rows):
        node = queue.popleft()
        for side in ("left", "right"):
            if index >= len(rows):
                break
            row = rows[index]
            index += 1
            if row is None:
                continue
            if not isinstance(row, list) or len(row) != 2:
                raise ValueError("random_tree node must be a [val, random] row")
            child = RandomTreeNode(row[0])
            setattr(node, side, child)
            order.append(child)
            pending.append((child, row[1]))
            queue.append(child)
    for node, target in pending:
        if target is None:
            continue
        if not 0 <= target < len(order):
            raise ValueError("Random pointer target is out of range")
        node.random = order[target]
    return root


def serialize_random_tree(root: Any, input_nodes: Any = ()) -> list:
    # Level order rows like the input side; the clone check forbids
    # returning (part of) the input tree, and every random pointer must
    # land inside the returned tree.
    if root is None:
        return []
    rows = []
    order = []
    marks = set()
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            rows.append(None)
            order.append(None)
            continue
        if id(node) in marks:
            raise ValueError("Random tree repeats a node in level order")
        marks.add(id(node))
        rows.append(node.val)
        order.append(node)
        queue.extend((node.left, node.right))
    while rows and rows[-1] is None:
        rows.pop()
        order.pop()
    if any(id(node) in marks for node in input_nodes):
        raise ValueError("Returned tree shares nodes with the input tree")
    # Random indices address present nodes in level order — the same
    # convention the decode side uses — so placeholder slots shift
    # neither the numbering nor the walk below.
    present = [node for node in order if node is not None]
    index_of = {id(node): index for index, node in enumerate(present)}
    encoded = []
    for node in order:
        if node is None:
            encoded.append(None)
            continue
        if node.random is None:
            encoded.append([node.val, None])
            continue
        if id(node.random) not in index_of:
            raise ValueError("Random pointer leaves the returned tree")
        encoded.append([node.val, index_of[id(node.random)]])
    return encoded


def binary_tree_nodes(root: Any) -> list:
    """Every node reachable through left/right from a decoded tree (the
    input side of the random_tree clone check; random targets live inside
    the tree, so left/right reaches them all)."""
    nodes = []
    marks = set()
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None or id(node) in marks:
            continue
        marks.add(id(node))
        nodes.append(node)
        queue.extend((node.left, node.right))
    return nodes


# ---- graph (bundle-named class) ------------------------------------------


def _parse_graph(module: Any, rows: Any, class_name: str) -> Any:
    GraphNode = _cls(module, class_name)
    nodes = [GraphNode(index + 1) for index in range(len(rows))]
    for node, neighbors in zip(nodes, rows):
        for value in neighbors:
            if not 1 <= value <= len(nodes):
                raise ValueError(f"Graph neighbor {value} is out of range")
            node.neighbors.append(nodes[value - 1])
    return nodes[0] if nodes else None


def serialize_graph(result: Any, input_nodes: Any = ()) -> list:
    # BFS from the returned node, rows in val order, neighbor order kept;
    # a returned node that IS an input node means the graph was not cloned.
    if result is None:
        return []
    visited = []
    marks = set()
    queue = [result]
    while queue:
        node = queue.pop(0)
        if id(node) in marks:
            continue
        marks.add(id(node))
        visited.append(node)
        queue.extend(node.neighbors)
    visited.sort(key=lambda node: node.val)
    shared = {id(node) for node in input_nodes}
    if shared and any(id(node) in shared for node in visited):
        raise ValueError("Returned graph shares nodes with the input graph")
    # LC treats adjacency order as irrelevant; the cpp/go/js/ts wrappers
    # sort each row before encoding, so python must too — a correct clone
    # that assembles neighbors in any other valid order would else be a
    # false wrong-answer against a sorted expected.
    return [sorted(neighbor.val for neighbor in node.neighbors) for node in visited]


def graph_nodes(head: Any) -> list:
    """Every node reachable from a decoded graph head (the input side of the
    clone check)."""
    visited = []
    marks = set()
    queue = [head]
    while queue:
        node = queue.pop(0)
        if node is None or id(node) in marks:
            continue
        marks.add(id(node))
        visited.append(node)
        queue.extend(node.neighbors)
    return visited


# ---- random_list (bundle-named class) -------------------------------------


def _parse_random_list(module: Any, pairs: Any, class_name: str) -> Any:
    RandomListNode = _cls(module, class_name)
    nodes = [RandomListNode(pair[0]) for pair in pairs]
    for node, pair in zip(nodes, pairs):
        index = pair[1]
        if index is not None:
            if not 0 <= index < len(nodes):
                raise ValueError("Random pointer target is out of range")
            node.random = nodes[index]
    for left, right in zip(nodes, nodes[1:]):
        left.next = right
    return nodes[0] if nodes else None


def serialize_random_list(result: Any, input_nodes: Any = ()) -> list:
    nodes = []
    marks = set()
    node = result
    while node is not None:
        if id(node) in marks:
            raise ValueError("Random list has a cycle in next")
        marks.add(id(node))
        nodes.append(node)
        node = node.next
    if any(id(node) in marks for node in input_nodes):
        raise ValueError("Returned list shares nodes with the input list")
    index_of = {id(node): index for index, node in enumerate(nodes)}
    return [[node.val, index_of.get(id(node.random))] for node in nodes]


def chain_nodes(head: Any) -> list:
    """The nodes of a decoded list chain."""
    nodes = []
    while head is not None:
        nodes.append(head)
        head = head.next
    return nodes


# ---- dispatch ---------------------------------------------------------

# Kinds whose wire names a class explicitly (value_type["class"]), falling
# back to the "Node" naming convention when the bundle omits it — mirrors
# runner/executors/typed.py's _CLASS_KINDS / provided_node_class.
CLASS_BEARING_CODECS = {"graph", "random_list", "doubly_list", "doubly_list_node", "random_tree"}


def decode(value: Any, codec: str, module: Any, class_name: str | None = None) -> Any:
    if codec == "json":
        return value
    if codec == "list_node":
        return _parse_list_node(module, value)
    if codec == "tree_node":
        return _parse_tree_node(module, value)
    if codec == "list_node_array":
        return [_parse_list_node(module, item) for item in value]
    if codec == "tree_node_array":
        return [_parse_tree_node(module, item) for item in value]
    if codec == "nary_tree":
        return _parse_nary_tree(module, value)
    if codec == "quad_tree":
        return _parse_quad_tree(module, value)
    if codec == "nested":
        return _parse_nested(module, value)
    if codec == "next_tree":
        return _parse_next_tree(module, value)
    if codec == "circular_list":
        return _parse_circular_list(module, value)
    if codec == "multi_list":
        return _parse_multi_list(module, value)
    if codec == "graph":
        return _parse_graph(module, value, class_name or "Node")
    if codec == "random_list":
        return _parse_random_list(module, value, class_name or "Node")
    if codec == "doubly_list":
        return _parse_doubly_list(module, value, class_name or "Node")
    if codec == "doubly_list_node":
        return _parse_doubly_list_node(module, value, class_name or "Node")
    if codec == "nary_tree_nodes":
        return _parse_nary_tree_nodes(module, value)
    if codec == "special_tree":
        return _parse_special_tree(module, value)
    if codec == "random_tree":
        return _parse_random_tree(module, value, class_name or "Node")
    raise ValueError(f"Unsupported input codec: {codec}")


def encode(value: Any, codec: str) -> Any:
    """Serialization never constructs a class — every codec here reads
    only the shared attribute shape, so it runs on any object regardless
    of which bundle's class built it."""
    if codec == "json":
        return value
    if codec == "list_node":
        return _serialize_list_node(value)
    if codec == "tree_node":
        return _serialize_tree_node(value)
    if codec == "list_node_array":
        return [_serialize_list_node(item) for item in value]
    if codec == "tree_node_array":
        return [_serialize_tree_node(item) for item in value]
    if codec == "nary_tree":
        return _serialize_nary_tree(value)
    if codec == "quad_tree":
        return _serialize_quad_tree(value)
    if codec == "nested":
        return _serialize_nested(value)
    if codec == "next_tree":
        return _serialize_next_tree(value)
    if codec == "circular_list":
        return _serialize_circular_list(value)
    if codec == "circular_list_array":
        return [_serialize_circular_list(item) for item in value]
    if codec == "doubly_circular":
        return _serialize_doubly_circular(value)
    if codec == "multi_list":
        return _serialize_multi_list(value)
    if codec == "doubly_list":
        return _serialize_doubly_list(value)
    raise ValueError(f"Unsupported output codec: {codec}")
