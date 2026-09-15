from typing import List


class Solution:
    def maxSumAfterOperation(self, nums: List[int]) -> int:
        # dp0: best subarray sum ending here with no square; dp1: best
        # with exactly one square. The answer is the largest dp1 over all
        # ending positions. (The RHS is fully evaluated before the tuple
        # assignment, so both transitions read the previous states.)
        dp0 = nums[0]
        dp1 = nums[0] * nums[0]
        answer = dp1
        for v in nums[1:]:
            dp0, dp1 = max(v, dp0 + v), max(v * v, dp0 + v * v, dp1 + v)
            answer = max(answer, dp1)
        return answer
