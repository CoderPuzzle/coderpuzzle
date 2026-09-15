from collections import deque
from typing import List, Optional


class Solution:
    def minimumOperations(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        total = 0
        queue = deque([root])
        while queue:
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
            # Minimum swaps to sort this level = sum of (cycle length - 1).
            target = sorted(level)
            pos = {v: i for i, v in enumerate(level)}
            visited = [False] * len(level)
            for i in range(len(level)):
                if visited[i] or level[i] == target[i]:
                    visited[i] = True
                    continue
                j = i
                cycle = 0
                while not visited[j]:
                    visited[j] = True
                    cycle += 1
                    j = pos[target[j]]
                total += cycle - 1
        return total
