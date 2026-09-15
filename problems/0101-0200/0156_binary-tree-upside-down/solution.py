from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def upsideDownBinaryTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        node, parent, sibling = root, None, None
        # Loop invariant: `node` walks the original left spine, `parent` is
        # its original parent and `sibling` its original right sibling; every
        # spine node already passed is fully relinked into its flipped
        # orientation, so the loop only ever reads original edges ahead of it.
        while node is not None:
            # Save both links before overwriting: `nxt` continues the spine
            # walk, `right_save` is the sibling of the next spine node.
            nxt = node.left
            right_save = node.right
            # The original right sibling becomes the new left child.
            node.left = sibling
            # The original parent becomes the new right child.
            node.right = parent
            parent, sibling, node = node, right_save, nxt
        # The walk ends past the leftmost node; `parent` is that node — the
        # new root.
        return parent
