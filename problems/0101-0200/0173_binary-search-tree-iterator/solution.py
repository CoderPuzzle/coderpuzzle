from typing import List, Optional


class BSTIterator:
    """Lazy in-order traversal of a BST via a left-spine stack.

    The constructor pushes the left spine of the root; the stack top is
    always the smallest unvisited node. `next` pops it and pushes the left
    spine of its right child, so each node enters and leaves the stack
    exactly once and the stack never holds more than one root-to-node
    path — O(h) memory.
    """

    def __init__(self, root: Optional[TreeNode]) -> None:  # noqa: F821
        self.stack: List[TreeNode] = []  # noqa: F821
        self._push_spine(root)

    def _push_spine(self, node) -> None:
        # Everything on this path is smaller than what lies below it, so the
        # last one pushed is the next value in order.
        while node is not None:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        node = self.stack.pop()
        # The popped node's right subtree holds the values that come next;
        # its left spine is the front of that block.
        self._push_spine(node.right)
        return node.val

    def hasNext(self) -> bool:  # noqa: N802 — LeetCode API
        return bool(self.stack)
