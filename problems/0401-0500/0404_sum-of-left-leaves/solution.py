import sys
from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:
        # A skewed 1000-node chain nests over 1000 calls, past CPython's
        # default recursion limit; lift it so the recursion stays the answer.
        sys.setrecursionlimit(10000)

        # Pre-order carrying each node's side: when the walk enters a leaf it
        # already knows whether that leaf is the left child of another node,
        # so its value is settled on the spot and no parent is revisited.
        def collect(node: Optional[TreeNode], is_left: bool) -> int:
            if node is None:
                return 0
            # A leaf contributes only when it hangs off a parent's left; the
            # root enters flagged as a right child — it is nobody's child.
            if node.left is None and node.right is None:
                return node.val if is_left else 0
            return collect(node.left, True) + collect(node.right, False)

        return collect(root, False)
