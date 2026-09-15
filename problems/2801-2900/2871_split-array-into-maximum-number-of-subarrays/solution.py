from typing import List


class Solution:
    def maxSubarrays(self, nums: List[int]) -> int:
        completed = 0
        current = -1
        for num in nums:
            current &= num
            if current == 0:
                completed += 1
                current = -1
        return max(completed, 1)
