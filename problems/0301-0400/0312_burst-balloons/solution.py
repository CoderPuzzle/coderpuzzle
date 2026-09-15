from typing import List, Optional


class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        # Pad with virtual 1s so bursts at the boundary need no special casing.
        padded = [1] + nums + [1]
        m = len(padded)
        dp = [[0] * m for _ in range(m)]
        # Fill by increasing interval length so both subintervals of a cell
        # are already solved when it is needed.
        for length in range(1, m - 1):
            for left in range(1, m - length):
                right = left + length - 1
                # Try each k as the LAST burst in the open interval (left, right):
                # at that moment its neighbors are the fixed boundaries.
                for k in range(left, right + 1):
                    coins = padded[left - 1] * padded[k] * padded[right + 1] + dp[left][k - 1] + dp[k + 1][right]
                    if coins > dp[left][right]:
                        dp[left][right] = coins
        # Everything strictly between the two padding 1s.
        return dp[1][m - 2]
