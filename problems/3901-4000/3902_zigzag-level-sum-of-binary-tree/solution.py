from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def zigzagLevelSum(self, root: Optional[TreeNode]) -> List[int]:
        frontier = [root]
        answer = []
        odd = True
        while frontier:
            total = 0
            nodes = frontier if odd else reversed(frontier)
            for node in nodes:
                required = node.left if odd else node.right
                if required is None:
                    break
                total += node.val
            answer.append(total)
            frontier = [child for node in frontier for child in (node.left, node.right) if child is not None]
            odd = not odd
        return answer
