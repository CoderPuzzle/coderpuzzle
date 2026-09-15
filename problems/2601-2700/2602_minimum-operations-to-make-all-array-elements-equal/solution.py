from typing import List, Optional

from bisect import bisect_left


class Solution:
    def minOperations(self, nums: List[int], queries: List[int]) -> List[int]:
        nums = sorted(nums)
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, x in enumerate(nums):
            prefix[i + 1] = prefix[i] + x
        out = []
        for q in queries:
            # Each query is the sum of |nums[i] - q|; sorted prefix sums make
            # it one binary search plus O(1) arithmetic. j counts elements
            # strictly below q (ties land right but contribute zero anyway).
            j = bisect_left(nums, q)
            # Smaller elements are raised to q: q * j - their sum.
            left = q * j - prefix[j]
            # Larger elements are lowered: their sum - q * (n - j).
            right = (prefix[n] - prefix[j]) - q * (n - j)
            out.append(left + right)
        return out
