from typing import List


class Solution:
    def kBigIndices(self, nums: List[int], k: int) -> int:
        # Two Fenwick sweeps over the value range answer, for every index,
        # how many strictly smaller values sit on each side: a forward pass
        # fills the left counts and a backward pass reuses the same helper
        # on a fresh tree for the right ones. An index is k-big exactly
        # when both counts reach k.
        def smaller_counts(values):
            bound = max(values)
            tree = [0] * (bound + 1)
            counts = [0] * len(values)
            for i, value in enumerate(values):
                j = value - 1
                while j > 0:
                    counts[i] += tree[j]
                    j -= j & -j
                j = value
                while j <= bound:
                    tree[j] += 1
                    j += j & -j
            return counts

        left = smaller_counts(nums)
        right = smaller_counts(nums[::-1])[::-1]
        return sum(1 for i in range(len(nums)) if left[i] >= k and right[i] >= k)
