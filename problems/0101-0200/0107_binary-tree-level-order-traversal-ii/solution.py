from typing import List, Optional
from collections import deque

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:
        result = []
        queue = deque([root]) if root is not None else deque()
        while queue:
            # One round of the outer loop consumes exactly one level: the
            # nodes sitting in the queue when the round starts.
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
            result.append(level)
        # Levels were collected root-first; the statement wants leaf-first.
        result.reverse()
        return result
