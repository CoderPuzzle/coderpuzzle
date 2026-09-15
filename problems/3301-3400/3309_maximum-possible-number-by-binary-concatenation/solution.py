from typing import List


class Solution:
    def maxGoodNumber(self, nums: List[int]) -> int:
        # Only 3! = 6 orders exist, so try each one exhaustively. Combining
        # is arithmetic: shift the accumulator left by the number's bit
        # length (no leading zeros) and OR the number into the freed bits.
        best = 0
        for a, b, c in (
            (nums[0], nums[1], nums[2]),
            (nums[0], nums[2], nums[1]),
            (nums[1], nums[0], nums[2]),
            (nums[1], nums[2], nums[0]),
            (nums[2], nums[0], nums[1]),
            (nums[2], nums[1], nums[0]),
        ):
            value = 0
            for x in (a, b, c):
                value = (value << x.bit_length()) | x
            best = max(best, value)
        return best
