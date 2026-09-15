class Codec:
    """Preorder codec with explicit null markers.

    The serialized format is this solution's own choice — the judge only
    requires that `deserialize(serialize(root))` rebuilds the same tree.
    Both directions are iterative, so deep trees are safe.
    """

    def serialize(self, root: TreeNode | None) -> str:  # noqa: F821
        tokens: list[str] = []
        stack: list[TreeNode | None] = [root]  # noqa: F821
        # Preorder with an explicit stack: pop a node, emit its value, then
        # push right before left so the left subtree is written first.
        while stack:
            node = stack.pop()
            if node is None:
                tokens.append("#")
                continue
            tokens.append(str(node.val))
            stack.append(node.right)
            stack.append(node.left)
        # Closing markers tell the replay when a subtree ends, so unlike the
        # breadth-first form nothing here can be trimmed.
        return ",".join(tokens)

    def deserialize(self, data: str) -> TreeNode | None:  # noqa: F821
        tokens = data.split(",")
        if tokens[0] == "#":
            return None
        root = TreeNode(int(tokens[0]))  # noqa: F821
        # Open child slots replay preorder: the top slot takes the next
        # token, a marker fills it with nothing, a value makes a node that
        # fills it and opens two slots of its own (right before left).
        pending: list[tuple[TreeNode, str]] = [(root, "right"), (root, "left")]
        index = 1
        while pending:
            node, side = pending.pop()
            token = tokens[index]
            index += 1
            if token != "#":
                child = TreeNode(int(token))  # noqa: F821
                setattr(node, side, child)
                pending.append((child, "right"))
                pending.append((child, "left"))
        return root
