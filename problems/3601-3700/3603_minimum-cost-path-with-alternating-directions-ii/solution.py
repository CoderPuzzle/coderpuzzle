from typing import List


class Solution:
    def minCost(self, m: int, n: int, waitCost: List[List[int]]) -> int:
        # Every move goes right or down, so between two consecutive moves a
        # path waits exactly once, on the cell it is leaving — never before
        # the first move (second 1) and never after the last. dp[j] is thus
        # the cheapest cost of STANDING on (i, j): its entry is paid, and so
        # is the wait of every cell departed earlier.
        dp = [0] * n
        # First row: reachable only from the left; entry cost is j + 1.
        dp[0] = 1
        for j in range(1, n):
            # The start's departure skips its wait; move 1 is immediate.
            wait = 0 if j == 1 else waitCost[0][j - 1]
            dp[j] = dp[j - 1] + wait + (j + 1)
        for i in range(1, m):
            prev = dp
            dp = [0] * n
            # First column: reachable only from above.
            dp[0] = prev[0] + (0 if i == 1 else waitCost[i - 1][0]) + (i + 1)
            for j in range(1, n):
                dp[j] = min(prev[j] + waitCost[i - 1][j], dp[j - 1] + waitCost[i][j - 1]) + (i + 1) * (j + 1)
        return dp[n - 1]
