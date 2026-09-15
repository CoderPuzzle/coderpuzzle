from typing import List, Optional


class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        # dp[i] = minimum path sum from column i of the current row to the
        # bottom. The last row seeds it directly: a path starting there is
        # just that cell.
        dp = list(triangle[-1])
        # Work bottom-up: every cell has exactly the two children i and i+1
        # below, so no ragged-edge special cases like a top-down sweep.
        for row in range(len(triangle) - 2, -1, -1):
            for i in range(len(triangle[row])):
                # Ascending i is safe in place: dp[i+1] still holds the row
                # below's value when read. dp shrinks to dp[0] at the apex.
                dp[i] = triangle[row][i] + min(dp[i], dp[i + 1])
        return dp[0]
