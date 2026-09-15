from typing import List, Optional


class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        diameter = 0

        def height(node):
            nonlocal diameter
            if node is None:
                return 0
            left = height(node.left)
            right = height(node.right)
            # The longest path anchored at this node joins its two subtree
            # heights (in edges); the best anchor may bypass the root, so
            # every node contributes a candidate.
            if left + right > diameter:
                diameter = left + right
            # Return the one-sided height — what the parent's candidate
            # needs, deliberately distinct from the two-sided diameter.
            return 1 + max(left, right)

        height(root)
        return diameter
