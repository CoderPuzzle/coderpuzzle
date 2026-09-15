from typing import List, Optional


class Solution:
    def lexicographicallySmallestArray(self, nums: List[int], limit: int) -> List[int]:
        n = len(nums)
        # Sort (value, index) pairs so components are contiguous runs of values.
        pairs = sorted((nums[i], i) for i in range(n))
        result = [0] * n
        i = 0
        while i < n:
            # A maximal run whose consecutive value gaps are all <= limit is
            # exactly one connected component; any larger gap splits it.
            j = i
            while j + 1 < n and pairs[j + 1][0] - pairs[j][0] <= limit:
                j += 1
            # Within a component any permutation is reachable, so place the
            # run's ascending values at its original indices in ascending order.
            indices = sorted(pairs[pos][1] for pos in range(i, j + 1))
            for pos, (value, _) in zip(indices, pairs[i : j + 1]):
                result[pos] = value
            i = j + 1
        return result
