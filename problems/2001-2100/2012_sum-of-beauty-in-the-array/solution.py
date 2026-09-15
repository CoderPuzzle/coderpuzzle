from typing import List


class Solution:
    def sumOfBeauties(self, nums: List[int]) -> int:
        n = len(nums)
        prefix = [0] * n
        suffix = [0] * n
        for index in range(1, n):
            prefix[index] = max(prefix[index - 1], nums[index - 1])
        suffix[n - 2] = nums[n - 1]
        for index in range(n - 3, 0, -1):
            suffix[index] = min(suffix[index + 1], nums[index + 1])

        beauty = 0
        for index in range(1, n - 1):
            if prefix[index] < nums[index] < suffix[index]:
                beauty += 2
            elif nums[index - 1] < nums[index] < nums[index + 1]:
                beauty += 1
        return beauty
