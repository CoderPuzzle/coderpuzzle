from typing import List


class Solution:
    def maximumSaleItems(self, items: List[List[int]], budget: int) -> int:
        maximum = max(factor for factor, _ in items)
        factor_count = [0] * (maximum + 1)
        for factor, _ in items:
            factor_count[factor] += 1
        divisible = [0] * (maximum + 1)
        for factor in range(1, maximum + 1):
            divisible[factor] = sum(factor_count[multiple] for multiple in range(factor, maximum + 1, factor))
        negative = -(10**9)
        dp = [negative] * (budget + 1)
        dp[0] = 0
        for factor, price in items:
            old = dp
            new = old.copy()
            gain = divisible[factor]
            for remainder in range(min(price, budget + 1)):
                best = negative
                q = 0
                for cost in range(remainder, budget + 1, price):
                    if q > 0 and old[cost - price] != negative:
                        best = max(best, old[cost - price] - (q - 1))
                    if best != negative:
                        new[cost] = max(new[cost], q + gain - 1 + best)
                    q += 1
            dp = new
        return max(dp)
