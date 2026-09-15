from typing import List


class Solution:
    def maximumLength(self, nums: List[int]) -> int:
        counts = {}
        for value in nums:
            counts[value] = counts.get(value, 0) + 1
        best = 0
        ones = counts.get(1, 0)
        if ones:
            # 1 squared is 1, so a run of 1s forms its own pattern: an odd
            # number is selectable; drop one when the count is even.
            best = ones if ones % 2 == 1 else ones - 1
        for value in counts:
            if value == 1:
                continue
            # Climb x, x^2, x^4, ... taking a pair at every level but the
            # top, which stays single. Cap 31622 is the largest base whose
            # square does not exceed the 10^9 constraint bound.
            length = 1
            current = value
            while current <= 31622 and counts[current] >= 2:
                square = current * current
                if square not in counts:
                    break
                length += 2
                current = square
            best = max(best, length)
        return best
