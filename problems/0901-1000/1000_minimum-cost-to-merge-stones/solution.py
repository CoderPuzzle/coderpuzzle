from typing import List, Optional


class Solution:
    def mergeStones(self, stones: List[int], k: int) -> int:
        n = len(stones)
        # each merge replaces k piles with one (count drops by k - 1), so
        # reaching a single pile requires (k - 1) | (n - 1)
        if (n - 1) % (k - 1) != 0:
            return -1
        INF = float("inf")
        prefix = [0] * (n + 1)
        for i, x in enumerate(stones):
            prefix[i + 1] = prefix[i] + x
        # dp[i][j][m] = min cost to compress stones[i..j] into exactly m piles
        dp = [[[INF] * (k + 1) for _ in range(n)] for _ in range(n)]
        # base: a single stone is already one pile at zero cost
        for i in range(n):
            dp[i][i][1] = 0
        # increasing length, so every subinterval is final before it is used
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                # split: left part squeezed to one pile, right to m - 1;
                # any m-pile configuration has such a first-pile split
                for m in range(2, k + 1):
                    for mid in range(i, j):
                        if dp[i][mid][1] < INF and dp[mid + 1][j][m - 1] < INF:
                            dp[i][j][m] = min(
                                dp[i][j][m],
                                dp[i][mid][1] + dp[mid + 1][j][m - 1],
                            )
                # at k piles the interval merges into one pile for a cost
                # equal to its total stones (prefix sums answer in O(1))
                if dp[i][j][k] < INF:
                    dp[i][j][1] = dp[i][j][k] + prefix[j + 1] - prefix[i]
        return dp[0][n - 1][1] if dp[0][n - 1][1] < INF else -1
