from typing import List, Optional
from collections import deque


class Solution:
    def nearestExit(self, maze: List[List[str]], entrance: List[int]) -> int:
        m, n = len(maze), len(maze[0])
        er, ec = entrance[0], entrance[1]
        # Every move costs one step, so plain BFS from the entrance visits cells
        # in order of increasing distance; dist doubles as the visited set (-1).
        dist = [[-1] * n for _ in range(m)]
        dist[er][ec] = 0
        q = deque([(er, ec)])
        while q:
            i, j = q.popleft()
            # Test on pop, not push: this cleanly skips the entrance itself
            # while returning the correct distance for any other border cell.
            if (i == 0 or i == m - 1 or j == 0 or j == n - 1) and (i, j) != (er, ec):
                return dist[i][j]
            for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ni, nj = i + di, j + dj
                if 0 <= ni < m and 0 <= nj < n and maze[ni][nj] == "." and dist[ni][nj] == -1:
                    # Assigning distance at enqueue time is what keeps the
                    # queue ordered by distance.
                    dist[ni][nj] = dist[i][j] + 1
                    q.append((ni, nj))
        # Queue drained without dequeuing any exit: no reachable exit exists.
        return -1
