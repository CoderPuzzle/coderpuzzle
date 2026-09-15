from typing import List


class Solution:
    def leftRightDifference(self, nums: List[int]) -> List[int]:
        # rightSum[i] is just total - leftSum[i] - nums[i], so one running
        # prefix replaces both arrays: pay one pass for the total, then a
        # second that walks left forward and emits each absolute difference.
        total = sum(nums)
        answer = []
        left = 0
        for value in nums:
            answer.append(abs(left - (total - left - value)))
            left += value
        return answer
