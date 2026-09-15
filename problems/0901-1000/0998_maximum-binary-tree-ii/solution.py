from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def insertIntoMaxTree(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        # Appending val to the end of the original array can only disturb
        # the tree's right spine: every node off that spine is the max of a
        # subarray that lies entirely before the appended value, so it and
        # its whole subtree are untouched. If val beats everything on the
        # spine (including an empty tree), it becomes the new overall
        # maximum, so it is the new root with the old tree hanging as its
        # left child.
        if root is None or val > root.val:
            node = TreeNode(val)
            node.left = root
            return node
        # Otherwise walk down the spine while it still dominates val. The
        # walk stops at the first spine node whose right child is either
        # absent or smaller than val — exactly where val belongs: it takes
        # over that child slot, and whatever used to sit there (still all
        # smaller than val, by construction of the spine) becomes val's own
        # left subtree.
        node = root
        while node.right is not None and node.right.val > val:
            node = node.right
        new_node = TreeNode(val)
        new_node.left = node.right
        node.right = new_node
        return root
