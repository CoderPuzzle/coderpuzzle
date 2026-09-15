from typing import List


class Solution:
    def minimumSwaps(self, nums: List[int]) -> int:
        n = len(nums)
        i = 0
        for k in range(1, n):
            if nums[k] < nums[i]:
                i = k
        j = n - 1
        for k in range(n - 2, -1, -1):
            if nums[k] > nums[j]:
                j = k
        return i + (n - 1 - j) - (1 if j < i else 0)
