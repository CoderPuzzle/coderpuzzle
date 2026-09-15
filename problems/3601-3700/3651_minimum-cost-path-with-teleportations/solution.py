from typing import List


class Solution:
    def minCost(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        inf = float("inf")
        # Layer 0 is the plain right/down minimum path sum: every move pays
        # its destination cell, and standing on the start costs nothing.
        d = [[inf] * n for _ in range(m)]
        d[0][0] = 0
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    continue
                best = d[i - 1][j] if i else inf
                if j and d[i][j - 1] < best:
                    best = d[i][j - 1]
                d[i][j] = best + grid[i][j]
        # Each further layer opens with one teleport: land anywhere whose
        # value is at least mine, at the previous layer's price of that
        # launch cell. Cells sorted by value descending turn the scan into
        # a running prefix minimum; ties share one prefix because the test
        # is >=.
        order = sorted(
            ((grid[i][j], i, j) for i in range(m) for j in range(n)),
            key=lambda item: (-item[0], item[1], item[2]),
        )
        answer = d[m - 1][n - 1]
        for _ in range(k):
            seed = [[inf] * n for _ in range(m)]
            run = inf
            p = 0
            for value, i, j in order:
                while p < len(order) and order[p][0] >= value:
                    si, sj = order[p][1], order[p][2]
                    if d[si][sj] < run:
                        run = d[si][sj]
                    p += 1
                seed[i][j] = run
            # Then ordinary right/down moves carry each landing spot through
            # the rest of the layer, as in the plain path-sum pass above.
            for i in range(m):
                for j in range(n):
                    best = seed[i][j]
                    g = grid[i][j]
                    if i and seed[i - 1][j] + g < best:
                        best = seed[i - 1][j] + g
                    if j and seed[i][j - 1] + g < best:
                        best = seed[i][j - 1] + g
                    seed[i][j] = best
            d = seed
            if d[m - 1][n - 1] < answer:
                answer = d[m - 1][n - 1]
        return answer
