from typing import List


class Solution:
    def countDigitOccurrences(self, nums: List[int], digit: int) -> int:
        # Peel each value's decimal digits with repeated division by ten.
        # Every element is at least 1 (never 0), so the loop faithfully
        # covers its digits with no leading-zero special case.
        total = 0
        for x in nums:
            while x > 0:
                if x % 10 == digit:
                    total += 1
                x //= 10
        return total
