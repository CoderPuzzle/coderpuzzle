from typing import List, Optional


class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        # Rolling states: cheapest total cost to be standing on each step.
        # Both start at 0 — the starting step is free to choose.
        prev2, prev1 = 0, 0
        for c in cost:
            # Arrive from i-1 or i-2, paying this step's cost on the hop.
            cur = c + min(prev1, prev2)
            prev2, prev1 = prev1, cur
        # The top is one final paid hop from the last or second-to-last step.
        return min(prev1, prev2)
