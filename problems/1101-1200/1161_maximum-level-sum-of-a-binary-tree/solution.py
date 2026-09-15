from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def maxLevelSum(self, root: Optional[TreeNode]) -> int:
        frontier: List[TreeNode] = [root]
        best_level = 1
        best_sum = root.val
        level = 1
        while frontier:
            total = sum(node.val for node in frontier)
            # Strict > keeps the SMALLEST level on ties.
            if total > best_sum:
                best_sum = total
                best_level = level
            nxt: List[TreeNode] = []
            for node in frontier:
                for child in (node.left, node.right):
                    if child is not None:
                        nxt.append(child)
            frontier = nxt
            level += 1
        return best_level
