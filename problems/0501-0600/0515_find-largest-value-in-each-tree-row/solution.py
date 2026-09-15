from typing import List, Optional
from collections import deque

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        largest = []
        queue = deque([root]) if root is not None else deque()
        while queue:
            # One round drains exactly one level: the nodes sitting in the
            # queue when the round starts. A level always holds at least one
            # node, so its first value seeds the running maximum — no
            # sentinel, which matters when a whole row sits at -2**31.
            best = queue[0].val
            for _ in range(len(queue)):
                node = queue.popleft()
                if node.val > best:
                    best = node.val
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
            largest.append(best)
        return largest
