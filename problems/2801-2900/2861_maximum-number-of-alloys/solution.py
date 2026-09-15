from typing import List


class Solution:
    def maxNumberOfAlloys(
        self, n: int, k: int, budget: int, composition: List[List[int]], stock: List[int], cost: List[int]
    ) -> int:
        # Binary search the alloy count. Making x alloys on one machine
        # costs sum(max(0, x * composition[m][j] - stock[j]) * cost[j])
        # coins, which never decreases as x grows, so affordability is
        # monotone and the largest feasible count can be bisected. The
        # count is bounded by min(stock) + budget: the metal with the
        # smallest stock needs at least x - stock[j] units bought and any
        # unit costs at least one coin. Every machine is probed per
        # candidate count; totals can reach about 2e12, wider than signed
        # 32-bit, and Python integers are arbitrary precision.
        def affordable(machine: List[int], count: int) -> bool:
            spent = 0
            for comp, have, price in zip(machine, stock, cost):
                need = count * comp - have
                if need > 0:
                    spent += need * price
                    if spent > budget:
                        return False
            return True

        best = 0
        low, high = 0, min(stock) + budget
        while low <= high:
            mid = (low + high) // 2
            if any(affordable(machine, mid) for machine in composition):
                best = mid
                low = mid + 1
            else:
                high = mid - 1
        return best
