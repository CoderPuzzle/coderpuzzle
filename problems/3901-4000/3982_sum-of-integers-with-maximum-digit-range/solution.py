from typing import List


class Solution:
    def maxDigitRange(self, nums: List[int]) -> int:
        ranges = []
        maximum = 0
        for value in nums:
            remaining = value
            low = 9
            high = 0
            while remaining:
                digit = remaining % 10
                low = min(low, digit)
                high = max(high, digit)
                remaining //= 10
            digit_range = high - low
            ranges.append(digit_range)
            maximum = max(maximum, digit_range)
        return sum(value for value, digit_range in zip(nums, ranges) if digit_range == maximum)
