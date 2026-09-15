from typing import List


class Solution:
    def compareBitonicSums(self, nums: List[int]) -> int:
        total = 0
        ascending = 0
        peak = nums[0]
        for index, value in enumerate(nums):
            total += value
            if index == 0 or value > nums[index - 1]:
                ascending += value
            peak = max(peak, value)
        descending = total - ascending + peak
        if ascending > descending:
            return 0
        if descending > ascending:
            return 1
        return -1
