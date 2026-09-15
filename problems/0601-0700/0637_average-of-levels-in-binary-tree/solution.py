from typing import List, Optional
from collections import deque

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
        averages = []
        queue = deque([root]) if root is not None else deque()
        while queue:
            # One round drains exactly one level: the nodes sitting in the
            # queue when the round starts. Children appended during the round
            # belong to the next level, and the count is fixed up front. The
            # sum stays an exact integer and the only rounding anywhere is
            # the single division that closes the round.
            total = 0
            remaining = len(queue)
            for _ in range(remaining):
                node = queue.popleft()
                total += node.val
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
            averages.append(total / remaining)
        return averages
