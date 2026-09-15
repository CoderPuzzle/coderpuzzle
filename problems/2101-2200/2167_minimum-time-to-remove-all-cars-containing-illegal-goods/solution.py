from typing import List, Optional


class Solution:
    def minimumTime(self, s: str) -> int:
        n = len(s)
        # cost(l, r) = l + (n - r) + 2 * count1(s[l:r])
        #            = n + sum over kept chars of (1 if '1' else -1).
        # Minimize by taking the minimum subarray sum (empty subarray allowed).
        min_end = 0
        best = 0
        for ch in s:
            value = 1 if ch == "1" else -1
            min_end = min(value, min_end + value)
            best = min(best, min_end)
        return n + best
