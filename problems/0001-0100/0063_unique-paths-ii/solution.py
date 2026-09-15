from typing import List


class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        # One rolling row of path counts: dp[j] holds the ways to reach
        # (current row, j), so the whole-grid DP collapses to a single row
        # that is reused as the scan moves down.
        n = len(obstacleGrid[0])
        dp = [0] * n
        # Seed a virtual row above the grid carrying one path into (0, 0),
        # withdrawn again when the start itself is an obstacle.
        dp[0] = 1 - obstacleGrid[0][0]
        for row in obstacleGrid:
            for j in range(n):
                if row[j]:
                    # An obstacle is unreachable by definition, so it must
                    # contribute nothing downstream: zero the cell.
                    dp[j] = 0
                elif j:
                    # Ways into (i, j) = ways from above (still in dp[j])
                    # plus ways from the left (dp[j - 1]).
                    dp[j] += dp[j - 1]
                # Column 0 keeps its value: only the cell above reaches it.
        return dp[-1]
