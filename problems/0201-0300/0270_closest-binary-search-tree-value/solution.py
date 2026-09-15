from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def closestValue(self, root: Optional[TreeNode], target: float) -> int:
        # One root-to-leaf descent: the search path for target visits the
        # largest value below it and the smallest above it, so the closest
        # value is decided on the path alone.
        best = 0
        best_distance = float("inf")
        node = root
        while node:
            distance = abs(node.val - target)
            # Strictly closer wins; at exactly equal distance the smaller
            # value wins, which settles ties like target 3.5 over 3 and 4.
            if distance < best_distance or (distance == best_distance and node.val < best):
                best = node.val
                best_distance = distance
            node = node.left if target < node.val else node.right
        return best
