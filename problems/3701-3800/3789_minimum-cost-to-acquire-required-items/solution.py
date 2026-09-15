class Solution:
    def minimumCost(self, cost1: int, cost2: int, costBoth: int, need1: int, need2: int) -> int:
        # Price each unit independently. A unit counted toward BOTH
        # requirements comes as one type 3 item or as one item of each
        # type, whichever is cheaper; a leftover unit of a single
        # requirement comes as that type's own item or as a type 3 item
        # whose spare contribution is wasted, whichever is cheaper. Units
        # never interact, so the per-unit minima sum to the global
        # minimum. Needs reach 1e9 against costs of 1e6, so totals pass
        # 2e15 -- Python ints make that a non-issue.
        pairs = min(need1, need2)
        pair_cost = min(costBoth, cost1 + cost2)
        rest1 = min(costBoth, cost1)
        rest2 = min(costBoth, cost2)
        return pairs * pair_cost + (need1 - pairs) * rest1 + (need2 - pairs) * rest2
