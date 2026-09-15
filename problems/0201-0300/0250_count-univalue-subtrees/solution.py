import sys
from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def countUnivalSubtrees(self, root: Optional[TreeNode]) -> int:
        # A skewed 1000-node chain nests over 1000 calls, past CPython's
        # default recursion limit; lift it so the recursion stays the answer.
        sys.setrecursionlimit(10000)
        count = 0

        # Post-order: each call reports whether the subtree rooted at `node`
        # is uni-value; every True is one more subtree for the count.
        def is_unival(node: Optional[TreeNode]) -> bool:
            nonlocal count
            # The empty tree is vacuously uni-value: an absent child never
            # breaks its parent. It is never counted, so root=None -> 0.
            if node is None:
                return True
            # Visit both children unconditionally: counting happens inside
            # the recursion, and a skipped branch would skip its own
            # uni-value subtrees.
            left_ok = is_unival(node.left)
            right_ok = is_unival(node.right)
            uni = (
                left_ok
                and right_ok
                and (node.left is None or node.left.val == node.val)
                and (node.right is None or node.right.val == node.val)
            )
            if uni:
                count += 1
            return uni

        is_unival(root)
        return count
