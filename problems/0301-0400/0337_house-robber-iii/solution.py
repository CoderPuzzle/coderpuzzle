from typing import Optional


class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        # Returns (rob, skip) for the subtree; pairing the two values
        # means each subtree is evaluated exactly once (post-order).
        def best(node):
            if node is None:
                return (0, 0)
            left_rob, left_skip = best(node.left)
            right_rob, right_skip = best(node.right)
            # Robbing here forbids both children: take their skip values.
            rob_here = node.val + left_skip + right_skip
            # Skipping leaves each child free to do its better option.
            skip_here = max(left_rob, left_skip) + max(right_rob, right_skip)
            return (rob_here, skip_here)

        return max(best(root))
