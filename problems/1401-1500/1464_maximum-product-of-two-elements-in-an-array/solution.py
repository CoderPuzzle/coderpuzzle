from typing import List


class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        first = second = 0
        for value in nums:
            if value > first:
                second = first
                first = value
            elif value > second:
                second = value
        return (first - 1) * (second - 1)
