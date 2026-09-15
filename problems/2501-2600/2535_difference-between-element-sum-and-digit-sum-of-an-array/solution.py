from typing import List


class Solution:
    def differenceOfSum(self, nums: List[int]) -> int:
        # One pass accumulates both sums at once; every element is at
        # least its own digit sum (equality only for single digits), and
        # the bounds (2000 elements of at most 2000) keep both totals
        # far inside int, so a single abs closes the case.
        element_sum = 0
        digit_sum = 0
        for value in nums:
            element_sum += value
            while value > 0:
                digit_sum += value % 10
                value //= 10
        return abs(element_sum - digit_sum)
