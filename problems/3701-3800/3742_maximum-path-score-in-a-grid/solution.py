class Solution:
    def maxPathScore(self, grid: list[list[int]], k: int) -> int:
        # A path starts on a free cell, so it can charge at most m + n - 2
        # times: budget states beyond min(k, m + n - 2) cannot occur.
        cap = min(k, len(grid) + len(grid[0]) - 2)
        # dp[j][c] holds the best score collected on a path ending at column
        # j of the row currently being swept with total cost exactly c; a
        # deeply negative marker stands for "unreachable". Cell (0, 0) is 0
        # by the constraints, so it seeds score 0 at cost 0.
        unreachable = -(1 << 30)
        dp = [[unreachable] * (cap + 1) for _ in range(len(grid[0]))]
        dp[0][0] = 0
        for row in grid:
            built = [None] * len(row)
            for j, value in enumerate(row):
                if j == 0:
                    merged = dp[0]
                else:
                    merged = list(map(max, dp[j], built[j - 1]))
                if value:
                    # A charged cell shifts every budget state up by one;
                    # states pushed past the cap are dropped.
                    merged.insert(0, unreachable)
                    del merged[cap + 1 :]
                    bonus = 2 if value > 1 else 1
                    merged = [score + bonus for score in merged]
                built[j] = merged
            dp = built
        best = max(dp[-1])
        return best if best >= 0 else -1
