from typing import List


class Solution:
    def semiOrderedPermutation(self, nums: List[int]) -> int:
        n = len(nums)
        i = 0
        j = 0
        for k in range(n):
            if nums[k] == 1:
                i = k
            if nums[k] == n:
                j = k
        return i + (n - 1 - j) - (1 if i > j else 0)
