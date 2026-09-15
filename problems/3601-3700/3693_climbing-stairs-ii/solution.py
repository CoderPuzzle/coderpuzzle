from math import inf
from typing import List


class Solution:
    def climbStairs(self, n: int, costs: List[int]) -> int:
        # prev1/prev2/prev3 are the cheapest ways to stand on the three steps
        # below the current one. Step 0 is free; the steps below it do not
        # exist, so their infinite costs price step 1 out of long opening
        # jumps.
        prev1, prev2, prev3 = 0, inf, inf
        for j in range(1, n + 1):
            land = costs[j - 1]
            # The final hop covered d steps for some d in 1..3, paying the
            # landing fee plus the squared jump length.
            cur = min(prev1 + land + 1, prev2 + land + 4, prev3 + land + 9)
            prev1, prev2, prev3 = cur, prev1, prev2
        return prev1
