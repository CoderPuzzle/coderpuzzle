from typing import List


class Solution:
    def maxValidPairSum(self, nums: List[int], k: int) -> int:
        best_left = nums[0]
        answer = -(10**30)
        for j in range(k, len(nums)):
            best_left = max(best_left, nums[j - k])
            answer = max(answer, best_left + nums[j])
        return answer
