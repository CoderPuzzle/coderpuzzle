from typing import List, Optional


class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        # dp maps each reachable running sum to the number of sign
        # assignments producing it; one way to stand at 0 before any number.
        dp = {0: 1}
        for value in nums:
            nxt = {}
            # Each reachable total branches into +value and -value;
            # identical totals merge and their counts add, so the map stays
            # bounded by distinct sums, not 2^i.
            for total, count in dp.items():
                nxt[total + value] = nxt.get(total + value, 0) + count
                nxt[total - value] = nxt.get(total - value, 0) + count
            dp = nxt
        return dp.get(target, 0)
