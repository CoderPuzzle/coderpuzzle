from typing import List, Optional


class Solution:
    def new21Game(self, n: int, k: int, maxPts: int) -> float:
        if k == 0 or n >= k - 1 + maxPts:
            return 1.0
        # dp[i] = probability of ever holding exactly i points.
        dp = [0.0] * (n + 1)
        dp[0] = 1.0
        window = 1.0  # sum of dp[max(0, i - maxPts) .. i - 1]
        for i in range(1, n + 1):
            dp[i] = window / maxPts
            if i < k:
                window += dp[i]
            if i - maxPts >= 0:
                window -= dp[i - maxPts]
        # Compensated (Neumaier) summation, matching the reference's built-in sum().
        total = 0.0
        c = 0.0
        for x in dp[k:]:
            t = total + x
            if abs(total) >= abs(x):
                c += (total - t) + x
            else:
                c += (x - t) + total
            total = t
        return total + c
