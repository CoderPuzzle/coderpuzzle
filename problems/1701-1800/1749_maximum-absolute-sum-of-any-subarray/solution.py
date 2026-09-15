from typing import List, Optional


class Solution:
    def maxAbsoluteSum(self, nums: List[int]) -> int:
        # The max of |subarray sum| is realized at one of the two
        # extremes: the max subarray sum or the negated min subarray
        # sum. Track both running extremes in one sweep, each starting
        # fresh whenever extending the run would only hurt it.
        best = worst = cur_max = cur_min = 0
        for v in nums:
            cur_max = max(cur_max + v, v)
            best = max(best, cur_max)
            cur_min = min(cur_min + v, v)
            worst = min(worst, cur_min)
        return max(best, -worst)
