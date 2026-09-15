from typing import List, Optional


class Solution:
    def _depth(self, node, left):
        # Walk one spine (all-left or all-right) to measure its depth.
        depth = 0
        while node is not None:
            depth += 1
            node = node.left if left else node.right
        return depth

    def countNodes(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        left_depth = self._depth(root, True)
        right_depth = self._depth(root, False)
        # Equal spine depths => the subtree is perfect: count it in closed
        # form, 2^d - 1, with no per-node traversal.
        if left_depth == right_depth:
            return (1 << left_depth) - 1
        # Ragged bottom: the missing nodes sit against the right side, so at
        # least one child is itself perfect and only the other recurses.
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)
