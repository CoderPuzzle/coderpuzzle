from typing import List, Optional


class Solution:
    def maxSumBST(self, root: Optional[TreeNode]) -> int:
        best = 0

        # returns (is_bst, min_val, max_val, subtree_sum) or None if not a BST
        def dfs(node):
            nonlocal best
            if node is None:
                return (True, None, None, 0)
            left = dfs(node.left)
            right = dfs(node.right)
            if not left[0] or not right[0]:
                return (False, 0, 0, 0)
            if left[2] is not None and left[2] >= node.val:
                return (False, 0, 0, 0)
            if right[1] is not None and right[1] <= node.val:
                return (False, 0, 0, 0)
            lo = left[1] if left[1] is not None else node.val
            hi = right[2] if right[2] is not None else node.val
            total = left[3] + right[3] + node.val
            if total > best:
                best = total
            return (True, lo, hi, total)

        dfs(root)
        return best
