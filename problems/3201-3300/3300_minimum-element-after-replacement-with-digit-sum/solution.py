from typing import List


class Solution:
    def minElement(self, nums: List[int]) -> int:
        # Replacement acts per element, and a number's digit sum is never
        # larger than the number itself, so the answer is the smallest
        # per-element digit sum.
        best = -1
        for value in nums:
            digit_sum = 0
            while value:
                digit_sum += value % 10
                value //= 10
            # The running minimum can only decrease: every replacement
            # shrinks (or keeps) its element.
            if best < 0 or digit_sum < best:
                best = digit_sum
        return best
