from typing import List, Optional


class Solution:
    def bstToGst(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Running sum of every value the reverse in-order has visited.
        total = 0

        def reverse_inorder(current):
            nonlocal total
            if current is None:
                return
            # Right subtree first: reversed in-order walks keys largest to smallest.
            reverse_inorder(current.right)
            # On arrival every strictly greater key is already in `total`, so
            # the overwrite yields this key plus the sum of all greater keys.
            total += current.val
            current.val = total
            # Left subtree sees the accumulated total of all larger values.
            reverse_inorder(current.left)

        reverse_inorder(root)
        return root
