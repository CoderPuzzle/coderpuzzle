from bisect import bisect_right
from typing import List, Optional


class Solution:
    def kIncreasing(self, arr: List[int], k: int) -> int:
        def longest_nondecreasing(seq):
            # Patience trick: tails[l] is the smallest possible tail of a
            # non-decreasing subsequence of length l+1.
            tails = []
            for value in seq:
                # bisect_right finds the first tail strictly greater than
                # value — equal elements extend the subsequence instead of
                # replacing, which is what makes it non-decreasing.
                pos = bisect_right(tails, value)
                if pos == len(tails):
                    tails.append(value)
                else:
                    tails[pos] = value
            return len(tails)

        operations = 0
        # arr[i-k] <= arr[i] only relates indices congruent mod k, so each
        # residue class is an independent subsequence.
        for start in range(k):
            sub = arr[start::k]
            # Keep the LNDS unchanged and rewrite everything else; values
            # are free, so any kept subsequence can be completed.
            operations += len(sub) - longest_nondecreasing(sub)
        return operations
