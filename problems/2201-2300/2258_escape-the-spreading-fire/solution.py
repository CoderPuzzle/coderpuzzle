from typing import List, Optional

from collections import deque


class Solution:
    def maximumMinutes(self, grid: List[List[int]]) -> int:
        m = len(grid)
        n = len(grid[0])
        INF = float("inf")
        dirs = ((1, 0), (-1, 0), (0, 1), (0, -1))
        target = (m - 1, n - 1)

        # fire spread is independent of where you walk: precompute fire[i][j],
        # the earliest minute fire occupies each cell, via one multi-source BFS
        fire = [[INF] * n for _ in range(m)]
        queue = deque()
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    fire[i][j] = 0
                    queue.append((i, j))
        while queue:
            i, j = queue.popleft()
            for di, dj in dirs:
                ni, nj = i + di, j + dj
                if 0 <= ni < m and 0 <= nj < n and grid[ni][nj] != 2 and fire[ni][nj] == INF:
                    fire[ni][nj] = fire[i][j] + 1
                    queue.append((ni, nj))

        def can_reach(wait):
            # the start cell must still be fire-free the moment you set out
            if wait >= fire[0][0]:
                return False
            seen = [[False] * n for _ in range(m)]
            seen[0][0] = True
            dq = deque([(0, 0, wait)])
            while dq:
                i, j, t = dq.popleft()
                if (i, j) == target:
                    return True
                for di, dj in dirs:
                    ni, nj = i + di, j + dj
                    if 0 <= ni < m and 0 <= nj < n and grid[ni][nj] != 2 and not seen[ni][nj]:
                        nt = t + 1
                        # the safehouse may tie the fire: reaching it the very
                        # minute fire does still counts as escaping
                        if (ni, nj) == target:
                            if nt <= fire[ni][nj]:
                                seen[ni][nj] = True
                                dq.append((ni, nj, nt))
                        # you move, then fire spreads: an ordinary cell is safe
                        # only if fire arrives strictly later than you
                        else:
                            if nt < fire[ni][nj]:
                                seen[ni][nj] = True
                                dq.append((ni, nj, nt))
            return False

        # sentinels first: -1 if even waiting 0 fails; the 1e9 sentinel means
        # fire can never pin you down. Survivability is monotone in wait, so
        # binary search the largest survivable wait.
        if not can_reach(0):
            return -1
        if can_reach(10**9):
            return 10**9

        lo, hi = 0, 10**9
        while lo < hi:
            # upper mid: when survivable, lo moves up to mid without stalling
            mid = (lo + hi + 1) // 2
            if can_reach(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
