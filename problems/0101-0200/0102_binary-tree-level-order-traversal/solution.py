from typing import List, Optional
from collections import deque


class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # Handle the empty tree up front, before the queue exists.
        if root is None:
            return []
        result = []
        queue = deque([root])
        # Loop invariant: at the top of each round the queue holds exactly
        # one level's nodes and nothing else.
        while queue:
            level = []
            # Snapshot the size now: children enqueued below belong to the
            # NEXT level, so draining exactly len(queue) nodes keeps levels
            # separated without any sentinel markers.
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                # Skipping None children on enqueue keeps the invariant;
                # left-then-right order preserves reading order.
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
            result.append(level)
        return result
