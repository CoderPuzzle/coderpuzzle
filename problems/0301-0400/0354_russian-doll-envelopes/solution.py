from typing import List, Optional
from bisect import bisect_left


class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        # Width ascending, height descending on ties: a chain needs strictly
        # increasing widths, so at most one envelope per width fits, and the
        # descending tie-break keeps equal widths from chaining among
        # themselves — the task reduces to LIS on heights.
        envelopes = sorted(envelopes, key=lambda e: (e[0], -e[1]))
        # Patience sorting: tails[i] = min height ending a chain of length i+1.
        tails = []
        for _, h in envelopes:
            # bisect_left enforces STRICT increase (rejects equal heights).
            i = bisect_left(tails, h)
            # Extend the longest chain, or replace the first >= tail with
            # this smaller one — safe, it only helps future extensions.
            if i == len(tails):
                tails.append(h)
            else:
                tails[i] = h
        return len(tails)
