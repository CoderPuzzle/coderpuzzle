from collections import deque
from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def findNearestRightNode(self, root: Optional[TreeNode], u: int) -> Optional[TreeNode]:
        # Level-order BFS: drain the queue one level at a time, left child
        # before right, so a level's nodes come out in left-to-right order.
        # The node right after the one matching u is the answer.
        if root is None:
            return None
        queue = deque([root])
        while queue:
            found = False
            for _ in range(len(queue)):
                node = queue.popleft()
                if found:
                    return node
                if node.val == u:
                    found = True
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
            if found:
                return None
        return None
