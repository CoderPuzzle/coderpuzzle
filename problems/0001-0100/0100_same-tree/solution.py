from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        # Two missing subtrees match; exactly one missing is a structural
        # mismatch — `p is q` is True only when both are None.
        if p is None or q is None:
            return p is q
        # Both nodes exist: values must agree here, and each aligned pair of
        # child subtrees must be the same tree by these very same rules.
        if p.val != q.val:
            return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
