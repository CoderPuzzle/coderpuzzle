from typing import List, Optional


class Solution:
    def maximumBeauty(self, nums: List[int], k: int) -> int:
        # An element can only ever take a value inside [v-k, v+k] — operating
        # moves it anywhere in that range and leaving it alone keeps it there.
        # Two elements can therefore be driven to one common value exactly
        # when their ranges intersect, i.e. their values differ by at most 2k.
        nums = sorted(nums)
        best = 1
        left = 0
        for right, value in enumerate(nums):
            # Shrink while the window's extremes do not share a common value;
            # once the extremes fit, every pair inside the window fits too,
            # because sorted order lets the extremes bound every difference.
            while value - nums[left] > 2 * k:
                left += 1
            # The whole window can be made equal, so its length is achievable;
            # windows only get longer by growing, never by shrinking.
            best = max(best, right - left + 1)
        return best
