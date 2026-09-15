from typing import List, Optional


class Solution:
    def longestRepeatingSubstring(self, s: str) -> int:
        n = len(s)

        # Exact check: every length-`length` window goes into a set, so a hit
        # means two identical substrings (overlaps allowed) — no hashing
        # caveats.
        def has_repeat(length):
            if length == 0:
                return True
            seen = set()
            for i in range(n - length + 1):
                piece = s[i : i + length]
                if piece in seen:
                    return True
                seen.add(piece)
            return False

        # Monotone feasibility: a repeat of length L implies repeats of every
        # shorter length, so binary search the largest feasible length. The
        # upper-mid convention keeps the loop terminating; hi starts at n-1
        # because the whole string cannot repeat within itself.
        lo, hi = 0, n - 1
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if has_repeat(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
