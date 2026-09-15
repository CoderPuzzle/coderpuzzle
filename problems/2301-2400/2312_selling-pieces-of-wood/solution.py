from typing import List, Optional


class Solution:
    def sellingWood(self, m: int, n: int, prices: List[List[int]]) -> int:
        # Dense price table: 0 where a shape is unsold, max on duplicates.
        price = [[0] * (n + 1) for _ in range(m + 1)]
        for h, w, p in prices:
            if price[h][w] < p:
                price[h][w] = p
        # dp[i][j] = best revenue from an i x j piece: sell whole, or one
        # horizontal / vertical first cut with both halves solved
        # independently. Increasing i then j keeps every subproblem ready.
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                # Selling whole is the default a cut must beat.
                best = price[i][j]
                row = dp[i]
                # Horizontal cuts: only up to the midpoint — the symmetric
                # i-h split need not be retried. Earlier rows are final.
                for h in range(1, i // 2 + 1):
                    v = dp[h][j] + dp[i - h][j]
                    if v > best:
                        best = v
                # Vertical cuts: earlier columns of the current row.
                for w in range(1, j // 2 + 1):
                    v = row[w] + row[j - w]
                    if v > best:
                        best = v
                dp[i][j] = best
        return dp[m][n]
