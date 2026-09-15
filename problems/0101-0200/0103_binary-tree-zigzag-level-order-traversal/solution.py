from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        result: List[List[int]] = []
        if root is None:
            return result
        # Loop invariant: `queue` holds exactly one level's nodes, left to
        # right; `left_to_right` says which way that level is emitted.
        queue = [root]
        left_to_right = True
        while queue:
            level = [node.val for node in queue]
            if not left_to_right:
                # Collected left to right, so reversing yields right to left.
                level.reverse()
            result.append(level)
            # Spread the next level: children enter left child first, which
            # keeps the queue ordered left to right for the round to come.
            queue = [child for node in queue for child in (node.left, node.right) if child is not None]
            left_to_right = not left_to_right
        return result
