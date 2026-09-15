from typing import List, Optional


class Solution:
    def minOperations(self, k: int) -> int:
        # All increases come first, all duplicates last (hint 1): a final
        # array of m equal values v was built with v-1 increases and m-1
        # duplicates, summing to m*v. Enumerate the single-element value v
        # and take ceil(k/v) - 1 duplicates for it; the best split wins.
        # Everything stays far below any 32-bit limit since k <= 10^5.
        best = k - 1
        for v in range(1, k + 1):
            dup = max((k + v - 1) // v - 1, 0)
            best = min(best, v - 1 + dup)
        return best
