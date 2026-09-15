class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def rob(self, root: TreeNode | None) -> int:
        # Returns (take, skip) for the subtree; pairing the two values
        # means each subtree is evaluated exactly once (post-order).
        def best(node):
            if node is None:
                return (0, 0)
            left_take, left_skip = best(node.left)
            right_take, right_skip = best(node.right)
            # Taking here forbids both children: use their skip values.
            take_here = node.val + left_skip + right_skip
            # Skipping leaves each child free to do its better option.
            skip_here = max(left_take, left_skip) + max(right_take, right_skip)
            return (take_here, skip_here)

        return max(best(root))
