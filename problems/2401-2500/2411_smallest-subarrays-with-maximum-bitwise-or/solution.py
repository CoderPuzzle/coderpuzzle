from typing import List


class Solution:
    def smallestSubarrays(self, nums: List[int]) -> List[int]:
        # One pass per bit, right to left: `last` is the nearest index at
        # or after i whose number carries that bit. The OR of nums[i..j]
        # is maximal exactly when j reaches the farthest such index over
        # all bits of the suffix OR, so answer[i] is the largest gap.
        n = len(nums)
        answer = [1] * n
        for bit in range(30):  # nums[i] <= 10^9 < 2^30
            last = -1
            for i in range(n - 1, -1, -1):
                if nums[i] >> bit & 1:
                    last = i
                if last >= 0 and last - i + 1 > answer[i]:
                    answer[i] = last - i + 1
        return answer
