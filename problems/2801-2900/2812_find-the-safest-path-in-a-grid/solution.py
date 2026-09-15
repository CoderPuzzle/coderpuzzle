from typing import List, Optional
from collections import deque


class Solution:
    def maximumSafenessFactor(self, grid: List[List[int]]) -> int:
        n = len(grid)
        # Multi-source BFS from every thief at once: wavefront exploration
        # makes dist[r][c] the minimum grid steps to the nearest thief —
        # exactly the cell's safeness value.
        dist = [[-1] * n for _ in range(n)]
        q = deque()
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    dist[r][c] = 0
                    q.append((r, c))
        dirs = ((1, 0), (-1, 0), (0, 1), (0, -1))
        while q:
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and dist[nr][nc] == -1:
                    dist[nr][nc] = dist[r][c] + 1
                    q.append((nr, nc))

        def reachable(threshold):
            # A path has factor >= threshold iff the corners stay connected
            # after deleting every cell with dist < threshold; endpoints
            # below it fail immediately.
            if dist[0][0] < threshold or dist[n - 1][n - 1] < threshold:
                return False
            seen = [[False] * n for _ in range(n)]
            seen[0][0] = True
            dq = deque([(0, 0)])
            while dq:
                r, c = dq.popleft()
                if r == n - 1 and c == n - 1:
                    return True
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n and not seen[nr][nc] and dist[nr][nc] >= threshold:
                        seen[nr][nc] = True
                        dq.append((nr, nc))
            return False

        # Reachability is monotone in the threshold, so binary search the
        # largest feasible v over [0, 2n] (the widest distance possible).
        # A thief on a corner pins its dist to 0, capping the answer at 0.
        lo, hi = 0, 2 * n
        ans = 0
        while lo <= hi:
            mid = (lo + hi) // 2
            if reachable(mid):
                ans = mid
                lo = mid + 1
            else:
                hi = mid - 1
        return ans
