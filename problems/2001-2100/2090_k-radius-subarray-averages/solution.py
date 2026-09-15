from typing import List, Optional


class Solution:
    def getAverages(self, nums: List[int], k: int) -> List[int]:
        averages = [-1] * len(nums)
        width = 2 * k + 1
        if width > len(nums):
            return averages

        window_sum = sum(nums[:width])
        averages[k] = window_sum // width
        for center in range(k + 1, len(nums) - k):
            window_sum += nums[center + k]
            window_sum -= nums[center - k - 1]
            averages[center] = window_sum // width
        return averages
