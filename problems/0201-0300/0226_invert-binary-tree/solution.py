from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # A mirror is self-similar: to invert a tree, invert both subtrees
        # and cross them at the root. The recursion bottoms out at None,
        # the empty tree, which is its own mirror.
        if root is None:
            return None
        # Each call returns a subtree already mirrored end-to-end, so the
        # two finished results only need to trade places at this node.
        left = self.invertTree(root.left)
        right = self.invertTree(root.right)
        root.left = right
        root.right = left
        return root
