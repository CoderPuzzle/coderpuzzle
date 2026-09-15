from collections import deque


class Solution:
    def hasValidPath(self, grid: List[List[int]]) -> bool:
        # Each street type is the set of sides it opens. A move between
        # neighbouring cells is legal only when the source opens the shared
        # side AND the target opens the opposite side, so a plain BFS from
        # (0,0) over those mutual connections decides reachability.
        street_sides = {
            1: (0, 1),
            2: (2, 3),
            3: (0, 3),
            4: (1, 3),
            5: (0, 2),
            6: (1, 2),
        }
        step = {0: (0, -1), 1: (0, 1), 2: (-1, 0), 3: (1, 0)}
        opposite = {0: 1, 1: 0, 2: 3, 3: 2}
        m, n = len(grid), len(grid[0])
        visited = [[False] * n for _ in range(m)]
        queue = deque([(0, 0)])
        visited[0][0] = True
        while queue:
            row, col = queue.popleft()
            if row == m - 1 and col == n - 1:
                return True
            for side in street_sides[grid[row][col]]:
                dr, dc = step[side]
                nr, nc = row + dr, col + dc
                if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
                    if opposite[side] in street_sides[grid[nr][nc]]:
                        visited[nr][nc] = True
                        queue.append((nr, nc))
        return False
