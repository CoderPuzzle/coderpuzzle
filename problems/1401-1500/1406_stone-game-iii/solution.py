from typing import List, Optional


class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        n = len(stoneValue)
        # dp[i] = best (current player's score - opponent's score) on the
        # suffix starting at i; dp[n] = 0 is the empty-row base.
        dp = [0] * (n + 1)
        # Backwards fill so dp[j+1] is already known whenever dp[i] reads it.
        for i in range(n - 1, -1, -1):
            take = 0
            best = float("-inf")
            # Try taking 1-3 piles; min(i+3, n) clamps short rows. Taking
            # piles i..j earns `take`, then the opponent plays optimally and
            # wins dp[j+1] over us, so the net is take - dp[j+1].
            for j in range(i, min(i + 3, n)):
                take += stoneValue[j]
                cand = take - dp[j + 1]
                if cand > best:
                    best = cand
            dp[i] = best
        # Alice moves first: dp[0] is her optimal margin over Bob.
        if dp[0] > 0:
            return "Alice"
        if dp[0] < 0:
            return "Bob"
        return "Tie"
