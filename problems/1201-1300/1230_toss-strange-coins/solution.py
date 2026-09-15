from typing import List, Optional


class Solution:
    def probabilityOfHeads(self, prob: List[float], target: int) -> float:
        # dp[c] = probability of exactly c heads among the coins so far;
        # zero heads is certain before any toss.
        dp = [0.0] * (target + 1)
        dp[0] = 1.0
        for p in prob:
            # Each coin shifts probability between adjacent counts: the tails
            # branch keeps c, the heads branch arrives from c-1. Descending
            # keeps dp[c-1] at the previous coin's value (upward would let
            # one coin contribute two heads).
            for c in range(target, 0, -1):
                dp[c] = dp[c] * (1 - p) + dp[c - 1] * p
            # Zero heads can only be reached by another tail.
            dp[0] *= 1 - p
        # Counts above target are never stored; dp[target] is exact.
        return dp[target]
