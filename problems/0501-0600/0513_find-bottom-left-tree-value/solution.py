from collections import deque
from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        # Children enter right-first, so every row drains right-to-left and
        # the last node dequeued overall is the leftmost node of the deepest
        # row: each dequeue overwrites the answer and the final row wins.
        answer = root.val
        queue = deque([root])
        while queue:
            node = queue.popleft()
            answer = node.val
            if node.right is not None:
                queue.append(node.right)
            if node.left is not None:
                queue.append(node.left)
        return answer
