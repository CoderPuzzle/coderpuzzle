from typing import List, Optional
from collections import deque


class Solution:
    def shortestPath(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        # If we can eliminate every obstacle on a monotone path, take it directly.
        if k >= m + n - 2:
            return m + n - 2
        start = (0, 0, k)
        seen = {start}
        queue = deque([start])
        steps = 0
        while queue:
            for _ in range(len(queue)):
                x, y, remaining = queue.popleft()
                if x == m - 1 and y == n - 1:
                    return steps
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < m and 0 <= ny < n:
                        nr = remaining - grid[nx][ny]
                        state = (nx, ny, nr)
                        if nr >= 0 and state not in seen:
                            seen.add(state)
                            queue.append(state)
            steps += 1
        return -1
