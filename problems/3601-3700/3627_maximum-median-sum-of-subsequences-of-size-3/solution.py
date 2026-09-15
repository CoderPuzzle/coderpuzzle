from typing import List


class Solution:
    def maximumMedianSum(self, nums: List[int]) -> int:
        # Sorted descending, the optimal play pairs the two largest
        # remaining values with the smallest remaining one: the largest is
        # sacrificed every step (it can only be a median of a triple that
        # contains an even larger element, which is impossible to arrange
        # for all of them), so spending it on deleting the smallest
        # leftover is free. Step t therefore consumes s[2t], s[2t + 1] and
        # the t-th smallest value s[n - 1 - t], making the medians the odd
        # indices 1, 3, 5, ... -- the first n/3 of them. The sum of up to
        # ~1.7e5 medians of value up to 1e9 reaches ~1.7e14, past 32 bits
        # but below 2^53, so Python ints are trivially exact.
        s = sorted(nums, reverse=True)
        return sum(s[1 : 2 * (len(nums) // 3) : 2])
