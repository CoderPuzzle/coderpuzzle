from typing import List


class Solution:
    def maximumSaleItems(self, items: List[List[int]], budget: int) -> int:
        n = len(items)
        factor_count = [0] * (n + 1)
        for factor, _ in items:
            factor_count[factor] += 1
        divisible = [0] * (n + 1)
        for factor in range(1, n + 1):
            divisible[factor] = sum(factor_count[multiple] for multiple in range(factor, n + 1, factor))
        batches = sorted((price, divisible[factor] - 1) for factor, price in items)
        cheapest = min(price for _, price in items)
        best = budget // cheapest
        spent = boosted = 0
        for price, capacity in batches:
            if price > 2 * cheapest or capacity == 0:
                continue
            take = min(capacity, (budget - spent) // price)
            spent += take * price
            boosted += take
            best = max(best, 2 * boosted + (budget - spent) // cheapest)
            if take < capacity:
                break
        return best
