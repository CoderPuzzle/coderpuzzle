from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if root is None:
            # The empty tree is trivially symmetric: nothing can disagree.
            return True

        def mirror(a: Optional[TreeNode], b: Optional[TreeNode]) -> bool:
            # Two missing subtrees match; exactly one missing is a structural
            # mismatch — `a is b` is True only when both are None.
            if a is None or b is None:
                return a is b
            # Symmetry lives across the center: values agree here, and the
            # OUTER pair (a.left, b.right) and INNER pair (a.right, b.left)
            # must each be mirrors by these same rules.
            return a.val == b.val and mirror(a.left, b.right) and mirror(a.right, b.left)

        return mirror(root.left, root.right)
