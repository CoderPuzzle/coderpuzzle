from typing import List


class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        # A sequential number is fully determined by its first digit and
        # its length — at most 9 lengths x 9 starting digits minus the runs
        # that would pass 9. Slide a fixed-length window over "123456789"
        # for each length; every window cut is one candidate.
        digits = "123456789"
        result = []
        for length in range(2, 10):
            for start in range(0, 10 - length):
                value = int(digits[start : start + length])
                if value > high:
                    return result
                if value >= low:
                    result.append(value)
        return result
