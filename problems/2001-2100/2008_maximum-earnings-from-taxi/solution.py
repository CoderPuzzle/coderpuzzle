from typing import List


class Solution:
    def maxTaxiEarnings(self, n: int, rides: List[List[int]]) -> int:
        ending = [[] for _ in range(n + 1)]
        for start, end, tip in rides:
            ending[end].append((start, end - start + tip))

        dp = [0] * (n + 1)
        for point in range(1, n + 1):
            dp[point] = dp[point - 1]
            for start, profit in ending[point]:
                dp[point] = max(dp[point], dp[start] + profit)
        return dp[n]
