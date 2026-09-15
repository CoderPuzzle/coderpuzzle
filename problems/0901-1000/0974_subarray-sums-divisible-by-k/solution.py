from typing import List


class Solution:
    def subarraysDivByK(self, nums: List[int], k: int) -> int:
        # A subarray's sum is the difference of two prefix sums, and that
        # difference is divisible by k exactly when both prefixes leave the
        # same remainder. An array counting each normalized remainder seen
        # so far, seeded with the empty prefix's 0, answers the lookup in
        # O(1) per step.
        count = 0
        prefix = 0
        remainders = [0] * k
        remainders[0] = 1
        for value in nums:
            prefix += value
            r = prefix % k  # Python's % is already non-negative
            count += remainders[r]
            remainders[r] += 1
        return count
