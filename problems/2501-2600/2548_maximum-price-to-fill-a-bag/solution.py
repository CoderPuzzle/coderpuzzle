from typing import List, Optional


class Solution:
    def maxPrice(self, items: List[List[int]], capacity: int) -> float:
        # Divisibility makes this fractional knapsack: moving a unit of weight
        # from a cheaper to a dearer price-per-weight item never lowers the
        # total, so a greedy fill in unit-price order is optimal.
        total_weight = sum(w for _, w in items)
        # If even every item together weighs less than the bag, no fractional
        # packing can fill it.
        if total_weight < capacity:
            return -1.0
        # Unit price descending: take each item whole while it fits.
        ordered = sorted(items, key=lambda item: item[0] / item[1], reverse=True)
        price = 0.0
        remaining = capacity
        for p, w in ordered:
            if remaining <= 0:
                break
            if w <= remaining:
                price += p
                remaining -= w
            else:
                # First item heavier than what remains: take just the
                # fraction remaining/w of it — the only floating-point step.
                price += p * (remaining / w)
                remaining = 0
        return price
