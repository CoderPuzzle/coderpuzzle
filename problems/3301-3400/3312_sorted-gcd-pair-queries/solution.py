from bisect import bisect_left
from typing import List


class Solution:
    def gcdValues(self, nums: List[int], queries: List[int]) -> List[int]:
        max_value = max(nums)
        freq = [0] * (max_value + 1)
        for value in nums:
            freq[value] += 1
        # pairs_with_gcd[d]: pairs whose gcd is exactly d. Processing d from
        # max_value down, pairs sharing divisor d minus the already-fixed
        # exact counts of every proper multiple of d (inclusion-exclusion).
        exact = [0] * (max_value + 1)
        for d in range(max_value, 0, -1):
            count = 0
            for multiple in range(d, max_value + 1, d):
                count += freq[multiple]
            pairs = count * (count - 1) // 2
            for multiple in range(2 * d, max_value + 1, d):
                pairs -= exact[multiple]
            exact[d] = pairs
        prefix = [0] * (max_value + 1)
        running = 0
        for d in range(1, max_value + 1):
            running += exact[d]
            prefix[d] = running
        # Query indices reach n * (n - 1) / 2 - 1 ~= 5 * 10^9, past i32:
        # they arrive as 64-bit values. Each answer is a gcd, at most 5 * 10^4.
        return [bisect_left(prefix, q + 1) for q in queries]
