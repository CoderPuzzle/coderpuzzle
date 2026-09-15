from typing import List, Optional

MOD = 10**9 + 7


class Solution:
    def numSub(self, s: str) -> int:
        # `run` tracks the length of the run of 1s ending at the current
        # position; adding it after each step accumulates n * (n + 1) / 2
        # for every completed run, one unit at a time.
        total = 0
        run = 0
        for c in s:
            run = run + 1 if c == "1" else 0
            total += run
        return total % MOD
