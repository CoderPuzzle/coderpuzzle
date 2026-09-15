from collections import deque
from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def deepestLeavesSum(self, root: Optional[TreeNode]) -> int:
        # Level-order sweep: level_sum is overwritten at every level, so when
        # the queue finally empties it holds exactly the deepest leaves' sum.
        if root is None:
            return 0
        queue = deque([root])
        level_sum = 0
        while queue:
            level_sum = 0
            for _ in range(len(queue)):
                node = queue.popleft()
                level_sum += node.val
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
        return level_sum
