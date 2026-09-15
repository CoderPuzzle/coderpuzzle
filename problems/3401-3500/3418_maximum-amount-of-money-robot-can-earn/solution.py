from typing import List


class Solution:
    def maximumAmount(self, coins: List[List[int]]) -> int:
        # dp[k][j]: best total reaching the current cell having used at most
        # k of the 2 neutralizations. Rows update in place (the left neighbor
        # is already fresh), so the cell above is snapshotted first.
        NEG = -(10**9)
        rows, cols = len(coins), len(coins[0])
        dp = [[NEG] * cols for _ in range(3)]
        for i in range(rows):
            row = coins[i]
            for j in range(cols):
                value = row[j]
                if i == 0 and j == 0:
                    dp[0][0] = value
                    dp[1][0] = dp[2][0] = max(value, 0)
                    continue
                up0, up1, up2 = dp[0][j], dp[1][j], dp[2][j]
                best0 = max(up0, dp[0][j - 1] if j else NEG)
                best1 = max(up1, dp[1][j - 1] if j else NEG)
                best2 = max(up2, dp[2][j - 1] if j else NEG)
                dp[0][j] = best0 + value
                # A neutralization (worth it only on a robber) adds 0 here
                # and enters from a neighbor's k-1 layer.
                dp[1][j] = max(best1 + value, best0 if value < 0 else NEG)
                dp[2][j] = max(best2 + value, best1 if value < 0 else NEG)
        return max(dp[0][-1], dp[1][-1], dp[2][-1])
