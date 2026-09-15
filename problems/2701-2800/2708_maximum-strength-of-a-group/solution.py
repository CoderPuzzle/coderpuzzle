from typing import List


class Solution:
    def maxStrength(self, nums: List[int]) -> int:
        # Sorting gathers the negatives at the front. Zeros never help (any
        # kept product has magnitude >= 1), and negatives only pay off in
        # even counts, so multiply every nonzero element except — when the
        # negative count is odd — s[neg - 1], the one closest to zero. If
        # nothing survives, the best group is the largest single element.
        # Products reach 9^13 ~ 2.5e12, past 32-bit range.
        s = sorted(nums)
        neg = sum(1 for v in s if v < 0)
        skip = neg - 1 if neg % 2 else -1
        prod = 1
        kept = False
        for i, v in enumerate(s):
            if i == skip or v == 0:
                continue
            prod *= v
            kept = True
        return prod if kept else s[-1]
