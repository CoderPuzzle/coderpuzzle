from typing import List


class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        # A server communicates iff its row or its column holds another
        # server — any communicating partner must share one of those lines,
        # so tallies per line settle it without searching the pair graph.
        m, n = len(grid), len(grid[0])
        row = [0] * m
        col = [0] * n
        for r in range(m):
            for c in range(n):
                if grid[r][c]:
                    row[r] += 1
                    col[c] += 1
        total = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] and (row[r] > 1 or col[c] > 1):
                    total += 1
        return total
