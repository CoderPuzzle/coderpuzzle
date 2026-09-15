from typing import List


class Solution:
    def xorAfterQueries(self, nums: List[int], queries: List[List[int]]) -> int:
        MOD = 10**9 + 7
        # Fold every query into a scratch copy: walk the indices l, l + k,
        # ... up to r, multiplying each visited element modulo the prime.
        # At most n positions per query keep the total work at n * q.
        values = list(nums)
        for l, r, k, v in queries:
            for idx in range(l, r + 1, k):
                values[idx] = values[idx] * v % MOD
        # Every element ends below 2^30, so the XOR fits in a machine int.
        result = 0
        for value in values:
            result ^= value
        return result
