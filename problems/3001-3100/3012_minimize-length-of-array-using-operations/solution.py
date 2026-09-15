from typing import List


class Solution:
    def minimumArrayLength(self, nums: List[int]) -> int:
        # A unique minimum absorbs everything (m % y == m for y > m), and a
        # value not divisible by the minimum forges an even smaller unique
        # minimum — both end at length 1. Otherwise every survivor stays a
        # multiple of m, and only merging two copies of m removes one.
        m = min(nums)
        count = nums.count(m)
        if count == 1 or any(value % m for value in nums):
            return 1
        return (count + 1) // 2
