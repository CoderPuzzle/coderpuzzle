from typing import List, Optional


class Solution:
    def minCosts(self, cost: List[int]) -> List[int]:
        # Reaching position i costs no more than the cheapest swap among
        # people 0..i: swap into the cheapest position, then every later
        # position (being behind you) is free.
        ans = []
        best = cost[0]
        for value in cost:
            if value < best:
                best = value
            ans.append(best)
        return ans
