from typing import List


class Solution:
    def concatWithReverse(self, nums: List[int]) -> List[int]:
        n = len(nums)
        answer = [0] * (2 * n)
        answer[:n] = nums
        for i in range(n):
            answer[n + i] = nums[n - i - 1]
        return answer
