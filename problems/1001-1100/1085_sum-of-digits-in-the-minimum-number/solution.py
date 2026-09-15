from typing import List


class Solution:
    def sumOfDigits(self, nums: List[int]) -> int:
        # The answer depends only on the smallest element; sum its digits
        # by peeling off the least significant digit one at a time.
        m = min(nums)
        digit_sum = 0
        while m:
            digit_sum += m % 10
            m //= 10
        return 0 if digit_sum % 2 else 1
