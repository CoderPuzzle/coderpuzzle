from typing import List, Optional


class Solution:
    def sumOddLengthSubarrays(self, arr: List[int]) -> int:
        # Every window sum is a difference of two prefix sums: with P[0] = 0, the
        # window [l, r] contributes P[r + 1] - P[l] to the total. Instead of
        # summing window by window, collect each prefix entry's coefficient: P[k]
        # is added once per odd window ending at k - 1, floor((k + 1) / 2) of
        # them, and subtracted once per odd window starting at k, of which there
        # are floor((n - k + 1) / 2), zero when k = n. One linear pass over the
        # prefix array therefore collapses the whole series.
        n = len(arr)
        prefix = [0] * (n + 1)
        for i, value in enumerate(arr):
            prefix[i + 1] = prefix[i] + value
        total = 0
        for k in range(1, n + 1):
            coef = (k + 1) // 2 - (n - k + 1) // 2
            total += coef * prefix[k]
        return total
