from typing import List


class Solution:
    def findPrefixScore(self, nums: List[int]) -> List[int]:
        # ans is the prefix sum of the conversion array, and each conversion
        # value is nums[i] plus the running maximum — so one fused pass keeps
        # a running max and a running total, never storing conver itself.
        result = []
        running_max = 0
        total = 0
        for value in nums:
            if value > running_max:
                running_max = value
            total += value + running_max
            result.append(total)
        return result
