from typing import List


class Solution:
    def totalHammingDistance(self, nums: List[int]) -> int:
        # A pair differs at a bit position exactly when one value has the
        # bit set and the other does not. If c of the n values carry the
        # bit, the position therefore contributes c * (n - c) differing
        # pairs, and summing that over all positions counts every
        # (pair, bit) difference exactly once. Values are at most 10^9,
        # below 2^30, so 31 fixed passes cover every position that can
        # ever hold a set bit.
        n = len(nums)
        total = 0
        for bit in range(31):
            set_count = 0
            for value in nums:
                set_count += (value >> bit) & 1
            total += set_count * (n - set_count)
        return total
