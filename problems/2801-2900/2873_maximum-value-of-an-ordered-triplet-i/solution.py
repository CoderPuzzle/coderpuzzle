from typing import List


class Solution:
    def maximumTripletValue(self, nums: List[int]) -> int:
        # One pass with two running prefix maxima: while treating the current
        # element as k, best_diff already holds the largest nums[i] - nums[j]
        # over i < j before it, so extending that best pair by nums[k] covers
        # every triplet ending here without ever re-scanning the prefix.
        # The answer is bounded by (10^6 - 1) * 10^6 < 2^53, which is why it
        # rides in a 64-bit integer in the typed languages yet stays exact
        # as a JavaScript double.
        best = 0  # all-negative answers collapse to 0 by the statement
        best_diff = 0  # max nums[i] - nums[j] over pairs already passed
        max_prefix = 0  # max nums[i] over indices already passed
        for x in nums:
            best = max(best, best_diff * x)
            best_diff = max(best_diff, max_prefix - x)
            max_prefix = max(max_prefix, x)
        return best
