from typing import List, Optional


class Solution:
    def maxSubArrayLen(self, nums: List[int], k: int) -> int:
        # first[prefix] = earliest index that prefix value occurred; the
        # seed 0: -1 lets a subarray starting at index 0 be found.
        first = {0: -1}
        acc = 0
        best = 0
        for i, x in enumerate(nums):
            acc += x
            # Subarray (j, i] sums to k exactly when the earlier prefix
            # equals acc - k; earliest j gives the longest subarray.
            j = first.get(acc - k)
            if j is not None and i - j > best:
                best = i - j
            # Keep only the first occurrence per prefix value — a later
            # duplicate would only shorten future subarrays.
            if acc not in first:
                first[acc] = i
        return best
