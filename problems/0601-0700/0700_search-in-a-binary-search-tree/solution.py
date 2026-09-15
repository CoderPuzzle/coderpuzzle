from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        # A BST orders the search path itself: every value in a node's left
        # subtree is below the node's value, every value in its right subtree
        # above it, so one comparison per node settles which side — if
        # either — can still hold val. Walk that one path: left while val is
        # smaller, right while it is larger, stop at equality — the node and
        # everything under it are exactly the subtree to return — or at a
        # null child, which proves val is absent (the empty tree on the
        # wire). The walk is a loop, not recursion: a 5000-node tree may be
        # a single chain, whose 5000 nested calls would pass CPython's
        # default recursion limit of 1000.
        while root is not None and root.val != val:
            root = root.left if root.val > val else root.right
        return root
