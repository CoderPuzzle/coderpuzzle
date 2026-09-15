from typing import List


class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        # Cheapest totals that leave house i red, blue, or green; a color
        # may not extend its own ending, which is the adjacency rule.
        red, blue, green = costs[0]
        for cost in costs[1:]:
            # One simultaneous step: every right-hand side reads the
            # previous house's endings, so no temporaries are needed.
            red, blue, green = (
                cost[0] + min(blue, green),
                cost[1] + min(red, green),
                cost[2] + min(red, blue),
            )
        # The last house may end in any color, so the answer is the
        # cheapest of the three surviving endings.
        return min(red, blue, green)
