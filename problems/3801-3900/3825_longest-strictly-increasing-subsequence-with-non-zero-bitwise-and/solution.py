from bisect import bisect_left
from typing import List, Optional


class Solution:
    def longestSubsequence(self, nums: List[int]) -> int:
        # A subsequence ANDs to something non-zero exactly when all of its
        # elements share at least one set bit, so for each bit keep the
        # elements that have it (order preserved) and take the longest
        # strictly increasing subsequence among them; the best bit wins.
        best = 0
        for b in range(max(nums).bit_length()):
            tails = []
            for x in nums:
                if x >> b & 1:
                    # Strictly increasing: replace the first tail >= x.
                    i = bisect_left(tails, x)
                    if i == len(tails):
                        tails.append(x)
                    else:
                        tails[i] = x
            best = max(best, len(tails))
        return best
