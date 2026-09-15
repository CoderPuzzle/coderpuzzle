class BSTIterator:
    """Bidirectional in-order walk via a precomputed array and an index.

    The constructor runs an iterative in-order traversal (an explicit
    stack, so depth never risks the call stack) and stores the ascending
    values once. `index` points at the current value, starting at -1 to
    mean "before the first value" — nothing handed out yet. `next` and
    `prev` just move that index by one and read the array.
    """

    def __init__(self, root: TreeNode | None) -> None:  # noqa: F821
        self.values: list[int] = []
        self._inorder(root)
        self.index = -1

    def _inorder(self, root) -> None:  # noqa: F821
        stack = []
        node = root
        while stack or node is not None:
            while node is not None:
                stack.append(node)
                node = node.left
            node = stack.pop()
            self.values.append(node.val)
            node = node.right

    def hasNext(self) -> bool:  # noqa: N802 — judge API keeps camelCase
        return self.index + 1 < len(self.values)

    def next(self) -> int:
        self.index += 1
        return self.values[self.index]

    def hasPrev(self) -> bool:  # noqa: N802 — judge API keeps camelCase
        return self.index > 0

    def prev(self) -> int:
        self.index -= 1
        return self.values[self.index]
