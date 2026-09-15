from typing import List


class Solution:
    def minElements(self, nums: List[int], limit: int, goal: int) -> int:
        # Only the array's total matters: one added element moves the sum
        # by at most +/-limit, so closing a gap g takes ceil(g / limit).
        # The sum reaches 1e11, so the gap math needs 64-bit range in the
        # fixed-width languages; Python ints are unbounded anyway.
        gap = abs(goal - sum(nums))
        return (gap + limit - 1) // limit
