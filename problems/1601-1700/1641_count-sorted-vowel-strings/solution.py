from typing import List, Optional


class Solution:
    def countVowelStrings(self, n: int) -> int:
        dp = [1] * 5
        for _ in range(n - 1):
            prefix = 0
            next_dp = [0] * 5
            for v in range(5):
                prefix += dp[v]
                next_dp[v] = prefix
            dp = next_dp
        return sum(dp)
