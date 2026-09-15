from typing import List


class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
        result = list(nums)
        for i in range(1, len(result)):
            result[i] += result[i - 1]
        return result
