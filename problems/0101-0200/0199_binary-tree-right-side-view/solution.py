from typing import List, Optional
from collections import deque

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        view = []
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
            # A level was collected left to right, so its last value is the
            # one the right side sees.
            view.append(level[-1])
        return view
