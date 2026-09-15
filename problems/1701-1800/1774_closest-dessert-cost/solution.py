from typing import List


class Solution:
    def closestCost(self, baseCosts: List[int], toppingCosts: List[int], target: int) -> int:
        # Reachable topping totals: start from {0}; each topping price t
        # maps every sum s to s, s + t, s + 2t. Scanning that set against
        # every base, the best dessert cost minimizes |b + s - target|,
        # ties broken toward the smaller cost.
        sums = {0}
        for t in toppingCosts:
            sums = {s + k * t for s in sums for k in (0, 1, 2)}
        best = None
        for b in baseCosts:
            for s in sums:
                cost = b + s
                key = (abs(cost - target), cost)
                if best is None or key < best:
                    best = key
        return best[1]
