from typing import List, Optional

from collections import deque


class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        rows, cols = len(heights), len(heights[0])
        # hi = the largest adjacent height difference: no path can force a
        # bigger step. A 1x1 grid has no edges, so hi stays 0 and the loop
        # below never runs.
        hi = 0
        for r in range(rows):
            for c in range(cols):
                for dr, dc in ((1, 0), (0, 1)):
                    nr, nc = r + dr, c + dc
                    if nr < rows and nc < cols:
                        hi = max(hi, abs(heights[nr][nc] - heights[r][c]))
        lo = 0
        # Feasibility is monotone in the cap: a path that fits under a cap
        # still fits under any larger one, so binary search applies.
        while lo < hi:
            mid = (lo + hi) // 2
            if self._reachable(heights, rows, cols, mid):
                hi = mid
            else:
                lo = mid + 1
        return lo

    def _reachable(self, heights, rows, cols, cap):
        visited = [[False] * cols for _ in range(rows)]
        visited[0][0] = True
        queue = deque([(0, 0)])
        while queue:
            r, c = queue.popleft()
            if r == rows - 1 and c == cols - 1:
                return True
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if (
                    0 <= nr < rows
                    and 0 <= nc < cols
                    and not visited[nr][nc]
                    # Only steps within the current cap may be crossed.
                    and abs(heights[nr][nc] - heights[r][c]) <= cap
                ):
                    visited[nr][nc] = True
                    queue.append((nr, nc))
        return False
