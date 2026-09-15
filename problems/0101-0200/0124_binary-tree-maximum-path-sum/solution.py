from typing import List, Optional


class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        # A path must contain at least one node, so start at -inf, not 0.
        best = float("-inf")

        def gain(node: Optional[TreeNode]) -> int:
            # Best path that starts at `node` and descends into at most one child.
            nonlocal best
            if node is None:
                return 0
            # Clamp each child's gain at 0: a negative branch is better left unvisited.
            left = max(gain(node.left), 0)
            right = max(gain(node.right), 0)
            # The path bending through this node is a candidate for the global answer.
            best = max(best, node.val + left + right)
            # The parent may only extend the path through one side.
            return node.val + max(left, right)

        gain(root)
        return best
