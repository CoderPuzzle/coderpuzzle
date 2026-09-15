from math import isqrt
from typing import List


class Solution:
    def numberOfRoutes(self, grid: List[str], d: int) -> int:
        MOD = 10**9 + 7
        n, m = len(grid), len(grid[0])
        # up[c]: ways standing on (r, c) after an arrival from below (or the
        # start); same_[c]: ways standing there after a same-row slide. A
        # slide may not follow another slide, so slides feed only from up.
        up = [1 if ch == "." else 0 for ch in grid[n - 1]]

        def slides_of(up_values: List[int], row: int) -> List[int]:
            # Prefix sums over the row's up-values; the Euclidean bound for
            # a same-row move is |dc| <= d (dr = 0).
            pref = [0] * (m + 1)
            for v in range(m):
                if grid[row][v] == ".":
                    pref[v + 1] = (pref[v] + up_values[v]) % MOD
                else:
                    pref[v + 1] = pref[v]
            out = [0] * m
            for c in range(m):
                if grid[row][c] != ".":
                    continue
                lo, hi = max(0, c - d), min(m - 1, c + d)
                out[c] = ((pref[hi + 1] - pref[lo]) - up_values[c]) % MOD
            return out

        same = slides_of(up, n - 1)
        # An up move has dr = -1, so 1 + dc^2 <= d^2 bounds |dc| by
        # floor(sqrt(d^2 - 1)) — d = 1 forbids diagonals entirely.
        w_up = isqrt(d * d - 1)
        for r in range(n - 2, -1, -1):
            # Every way of standing anywhere in row r+1 may step up into
            # row r's window around column c.
            pref = [0] * (m + 1)
            for v in range(m):
                if grid[r + 1][v] == ".":
                    pref[v + 1] = (pref[v] + up[v] + same[v]) % MOD
                else:
                    pref[v + 1] = pref[v]
            new_up = [0] * m
            for c in range(m):
                if grid[r][c] != ".":
                    continue
                lo, hi = max(0, c - w_up), min(m - 1, c + w_up)
                new_up[c] = (pref[hi + 1] - pref[lo]) % MOD
            new_same = slides_of(new_up, r)
            up, same = new_up, new_same
        ans = 0
        for c in range(m):
            if grid[0][c] == ".":
                ans = (ans + up[c] + same[c]) % MOD
        return ans
