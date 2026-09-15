from typing import List


class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        # The direct reading the follow-up names: square every element in
        # place, then let the language's sort produce the order. The input's
        # own arrangement is never consulted — squaring kills the sign, so
        # negatives need no case of their own.
        return sorted(value * value for value in nums)
