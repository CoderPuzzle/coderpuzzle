from typing import List, Optional


class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        # Switching person i from B to A changes the total by a_i - b_i alone,
        # so the cheapest plan applies the n smallest differences.
        ordered = sorted(costs, key=lambda cost: cost[0] - cost[1])
        # First half (most negative differences) flies A, rest fly B — the
        # split satisfies the half/half count structurally.
        n = len(ordered) // 2
        return sum(cost[0] for cost in ordered[:n]) + sum(cost[1] for cost in ordered[n:])
