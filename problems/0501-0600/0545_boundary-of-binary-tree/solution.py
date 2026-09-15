from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def boundaryOfBinaryTree(self, root: Optional[TreeNode]) -> List[int]:
        def is_leaf(node: TreeNode) -> bool:
            return node.left is None and node.right is None

        boundary: List[int] = [root.val]

        # Left boundary: start at the root's left child and keep descending,
        # left child when present and otherwise the right child, stopping
        # before any leaf — the leftmost leaf prints in the leaves alone.
        node = root.left
        while node is not None and not is_leaf(node):
            boundary.append(node.val)
            node = node.left if node.left is not None else node.right

        # Leaves left to right: an explicit-stack pre-order seeded with the
        # root's children (the root is never a leaf here, and being skipped
        # at the seed it cannot print twice), right child pushed first so
        # pops run left to right. The stack replaces recursion, so a
        # 10^4-deep chain costs no call stack.
        stack: List[TreeNode] = []
        if root.right is not None:
            stack.append(root.right)
        if root.left is not None:
            stack.append(root.left)
        while stack:
            node = stack.pop()
            if is_leaf(node):
                boundary.append(node.val)
                continue
            if node.right is not None:
                stack.append(node.right)
            if node.left is not None:
                stack.append(node.left)

        # Right boundary: the mirror walk from the root's right child —
        # right child preferred, stopped before its leaf — collected on the
        # way down and emitted reversed.
        right: List[int] = []
        node = root.right
        while node is not None and not is_leaf(node):
            right.append(node.val)
            node = node.right if node.right is not None else node.left
        boundary.extend(reversed(right))
        return boundary
