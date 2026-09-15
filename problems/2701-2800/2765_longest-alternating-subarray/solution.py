from typing import List


class Solution:
    def alternatingSubarray(self, nums: List[int]) -> int:
        # Track cur, the length of the alternating run ending at i. Its next
        # delta must be +1 when cur is odd and -1 when cur is even.
        best, cur = -1, 1
        for i in range(1, len(nums)):
            need = 1 if cur % 2 == 1 else -1
            delta = nums[i] - nums[i - 1]
            if delta == need:
                cur += 1
            elif delta == 1:
                # A +1 pair is a fresh run starting at i - 1: restart there,
                # not at i, or [2,3,4,3,4] loses its second half.
                cur = 2
            else:
                cur = 1
            if cur > 1:
                best = max(best, cur)
        return best
