from typing import List


class Solution:
    def largestNumber(self, cost: List[int], target: int) -> str:
        NEG = -1
        dp = [NEG] * (target + 1)
        dp[0] = 0
        for t in range(1, target + 1):
            for c in cost:
                if c <= t and dp[t - c] != NEG:
                    if dp[t - c] + 1 > dp[t]:
                        dp[t] = dp[t - c] + 1
        if dp[target] == NEG:
            return "0"
        result = []
        remaining = target
        while remaining > 0:
            for digit in range(9, 0, -1):
                c = cost[digit - 1]
                if c <= remaining and dp[remaining - c] == dp[remaining] - 1:
                    result.append(str(digit))
                    remaining -= c
                    break
        return "".join(result)
