from typing import List


class Solution:
    def orderOfLargestPlusSign(self, n: int, mines: List[List[int]]) -> int:
        # dp[i][j] ends as the order of the largest plus centered at (i, j):
        # every cell starts uncapped at n, mines drop to 0, then four
        # directional sweeps cap it by the run of consecutive 1's that way.
        dp = [[n] * n for _ in range(n)]
        for x, y in mines:
            dp[x][y] = 0
        for i in range(n):
            row = dp[i]
            run = 0
            for j in range(n):
                run = run + 1 if row[j] > 0 else 0
                if run < row[j]:
                    row[j] = run
            run = 0
            for j in range(n - 1, -1, -1):
                run = run + 1 if row[j] > 0 else 0
                if run < row[j]:
                    row[j] = run
        for j in range(n):
            run = 0
            for i in range(n):
                run = run + 1 if dp[i][j] > 0 else 0
                if run < dp[i][j]:
                    dp[i][j] = run
            run = 0
            for i in range(n - 1, -1, -1):
                run = run + 1 if dp[i][j] > 0 else 0
                if run < dp[i][j]:
                    dp[i][j] = run
        return max(max(row) for row in dp)
