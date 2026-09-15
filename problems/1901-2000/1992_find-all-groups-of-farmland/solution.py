from collections import deque
from typing import List


class Solution:
    def findFarmland(self, land: List[List[int]]) -> List[List[int]]:
        # Iterative BFS per unvisited farmland cell: flood the component and
        # track the min/max row and column, which for a rectangular group is
        # exactly its top-left and bottom-right corner.
        m, n = len(land), len(land[0])
        seen = [[False] * n for _ in range(m)]
        groups = []
        for r in range(m):
            for c in range(n):
                if land[r][c] == 1 and not seen[r][c]:
                    seen[r][c] = True
                    q = deque([(r, c)])
                    min_r = max_r = r
                    min_c = max_c = c
                    while q:
                        cr, cc = q.popleft()
                        min_r = min(min_r, cr)
                        max_r = max(max_r, cr)
                        min_c = min(min_c, cc)
                        max_c = max(max_c, cc)
                        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                            nr, nc = cr + dr, cc + dc
                            if 0 <= nr < m and 0 <= nc < n and land[nr][nc] == 1 and not seen[nr][nc]:
                                seen[nr][nc] = True
                                q.append((nr, nc))
                    groups.append([min_r, min_c, max_r, max_c])
        return groups
