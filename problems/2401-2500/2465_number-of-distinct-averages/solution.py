from typing import List


class Solution:
    def distinctAverages(self, nums: List[int]) -> int:
        # Sort, then pair the i-th smallest with the i-th largest. The
        # average (a + b) / 2 is distinct exactly when the sum a + b is
        # distinct, so track pair sums and never touch floats.
        ordered = sorted(nums)
        n = len(ordered)
        sums = set()
        for i in range(n // 2):
            sums.add(ordered[i] + ordered[n - 1 - i])
        return len(sums)
