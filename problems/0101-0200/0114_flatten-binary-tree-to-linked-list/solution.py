from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def flatten(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        node = root
        # Loop invariant: every node already passed hangs on a single right
        # spine — the flattened pre-order prefix, all left pointers null —
        # so `node` is always the next pre-order node awaiting its splice.
        while node is not None:
            if node.left is not None:
                # The rightmost node of the left subtree ends that subtree's
                # pre-order, so it is the last node visited before the old
                # right subtree: let it adopt that subtree, then swing the
                # whole left subtree across to the right.
                tail = node.left
                while tail.right is not None:
                    tail = tail.right
                tail.right = node.right
                node.right = node.left
                node.left = None
            node = node.right
        return root
