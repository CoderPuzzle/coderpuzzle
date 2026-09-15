from typing import List


class Solution:
    def orArray(self, nums: List[int]) -> List[int]:
        answer = [nums[i] | nums[i + 1] for i in range(len(nums) - 1)]
        return answer
