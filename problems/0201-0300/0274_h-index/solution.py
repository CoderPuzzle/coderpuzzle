from typing import List, Optional


class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        # h can never exceed the paper count, so citations above n are as good
        # as n: tally into n+1 buckets with oversized values clamped to n.
        count = [0] * (n + 1)
        for c in citations:
            count[min(c, n)] += 1
        # Walk h from the top; after adding bucket h, total is the number of
        # papers with at least h citations (larger counts were clamped into
        # higher-or-equal buckets and are already included).
        total = 0
        for h in range(n, -1, -1):
            total += count[h]
            # First h with "at least h papers cited >= h" is maximal: every
            # larger h was tested first and failed this same test.
            if total >= h:
                return h
        # Unreachable: at h = 0 the accumulated total is n >= 0.
        return 0
