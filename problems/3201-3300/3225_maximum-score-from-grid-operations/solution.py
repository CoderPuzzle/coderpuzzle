from typing import List


class Solution:
    def maximumScore(self, grid: List[List[int]]) -> int:
        n = len(grid)
        # pre[j][r] = sum of grid[0..r-1][j]; every scored stretch of a column
        # is the difference of two such monotone prefixes.
        pre = [[0] * (n + 1) for _ in range(n)]
        for j in range(n):
            for r in range(n):
                pre[j][r + 1] = pre[j][r] + grid[r][j]

        # A play is fully described by one height h[j] in [0, n] per column
        # (cells 0..h[j]-1 end up black). Cell (r, j) scores iff it is white
        # (r >= h[j]) and some horizontal neighbor is black (r < taller
        # neighbor height), so column j is worth the segment of column sums
        # [h[j], max(h[j-1], h[j+1])). Walk columns left to right carrying
        # the last two heights; choosing the next height settles the middle
        # column's flanks, crediting it exactly once. dp[c][a]: best score
        # after assigning columns 0..t-1 with h[t-1] = c, h[t-2] = a.
        neg = float("-inf")
        dp = [[neg] * (n + 1) for _ in range(n + 1)]
        for c in range(n + 1):
            dp[c][0] = 0  # h[0] = c; the phantom left neighbor has height 0

        for t in range(1, n):
            pcol = pre[t - 1]
            ndp = [[neg] * (n + 1) for _ in range(n + 1)]
            for a in range(n + 1):
                row = dp[a]
                # Credit for choosing h[t] = c is row[b] + pcol[max(a, b, c)]
                # - pcol[a] over previous heights b. Splitting b against
                # K = max(a, c) makes this an O(1) pair of lookup maxima:
                # b <= K adds the constant pcol[K] to a prefix maximum, while
                # b > K keeps its own pcol[b] in a suffix maximum.
                pm = [neg] * (n + 1)
                sp = [neg] * (n + 2)
                m = neg
                for b in range(n + 1):
                    v = row[b]
                    if v > m:
                        m = v
                    pm[b] = m
                s = neg
                for b in range(n, -1, -1):
                    w = row[b] + pcol[b]
                    if w > s:
                        s = w
                    sp[b] = s
                for c in range(n + 1):
                    k = a if a > c else c
                    best = pm[k] + pcol[k]
                    if sp[k + 1] > best:
                        best = sp[k + 1]
                    val = best - pcol[a]
                    if val > ndp[c][a]:
                        ndp[c][a] = val
            dp = ndp

        # Final virtual choice: the last column has no right neighbor, so it
        # is credited against max(h[n-2], 0) — the phantom height 0.
        plast = pre[n - 1]
        ans = -1
        for a in range(n + 1):
            row = dp[a]
            pm = [neg] * (n + 1)
            sp = [neg] * (n + 2)
            m = neg
            for b in range(n + 1):
                v = row[b]
                if v > m:
                    m = v
                pm[b] = m
            s = neg
            for b in range(n, -1, -1):
                w = row[b] + plast[b]
                if w > s:
                    s = w
                sp[b] = s
            best = pm[a] + plast[a]
            if sp[a + 1] > best:
                best = sp[a + 1]
            val = best - plast[a]
            if val > ans:
                ans = val
        return int(ans)
