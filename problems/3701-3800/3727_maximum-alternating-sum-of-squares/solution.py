from typing import List, Optional


class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        # Squares erase signs, so sort the squared magnitudes and put the
        # largest ceil(n / 2) on the plus slots, the rest on minus slots.
        squares = sorted(value * value for value in nums)
        minus = len(squares) // 2
        return sum(squares[minus:]) - sum(squares[:minus])
