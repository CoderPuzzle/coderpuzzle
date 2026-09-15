from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def pruneTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # A node's subtree is the node plus everything below it, so the
        # keep decision at a node needs its subtrees decided first — the
        # walk is post-order: children before the node.
        if root is None:
            return None
        root.left = self.pruneTree(root.left)
        root.right = self.pruneTree(root.right)
        # Keep the node exactly when it is a 1 itself or at least one
        # pruned child survives. A 0 node dropped here takes a subtree
        # with no 1 anywhere in it with it; an all-zero tree unwinds to
        # None. Depth is bounded — at most 200 nodes, so a chain nests
        # at most 201 frames, far under CPython's 1000-frame default.
        if root.val == 1 or root.left is not None or root.right is not None:
            return root
        return None
