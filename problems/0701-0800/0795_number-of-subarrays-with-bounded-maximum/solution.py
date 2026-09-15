from typing import List, Optional


class Solution:
    def numSubarrayBoundedMax(self, nums: List[int], left: int, right: int) -> int:
        def count_below(bound):
            # One-sided count of subarrays whose max is <= bound; the
            # answer follows by subtracting the two bounds.
            total = 0
            run = 0
            for v in nums:
                if v <= bound:
                    # run = length of the current streak of in-bounds
                    # elements: this element ends exactly run new
                    # subarrays, each counted once at its right end.
                    run += 1
                    total += run
                else:
                    # Above the bound: no valid subarray crosses here.
                    run = 0
            return total

        # Max in [left, right] iff at most right but not at most
        # left - 1; with left = 0 the subtracted count is empty.
        return count_below(right) - count_below(left - 1)
