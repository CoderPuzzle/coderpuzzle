from typing import List


class Solution:
    def isArraySpecial(self, nums: List[int], queries: List[List[int]]) -> List[bool]:
        n = len(nums)
        reach = [0] * n
        for i in range(1, n):
            reach[i] = i if nums[i - 1] % 2 == nums[i] % 2 else reach[i - 1]
        return [reach[t] <= f for f, t in queries]
