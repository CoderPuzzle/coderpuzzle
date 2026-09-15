from typing import List, Optional


class Solution:
    def countHomogenous(self, s: str) -> int:
        # Each position is charged with the number of homogenous
        # substrings ending there — the current run length — so the
        # running total realizes the per-run triangle sums directly.
        MOD = 10**9 + 7
        total = run = 0
        prev = ""
        for c in s:
            run = run + 1 if c == prev else 1
            prev = c
            total += run
        return total % MOD
