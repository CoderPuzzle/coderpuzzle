from typing import List, Optional


class Solution:
    def dieSimulator(self, n: int, rollMax: List[int]) -> int:
        MOD = 10**9 + 7
        # dp[j][c]: sequences of the current length ending with face j
        # repeated exactly c times (rollMax[i] <= 15, so 16 columns suffice)
        dp = [[0] * 16 for _ in range(6)]
        # base: one single-roll sequence per face
        for j in range(6):
            dp[j][1] = 1
        for _ in range(2, n + 1):
            nxt = [[0] * 16 for _ in range(6)]
            # per-face totals and grand total, from the previous table
            totals = [sum(dp[j]) for j in range(6)]
            grand = sum(totals)
            for j in range(6):
                limit = rollMax[j]
                # extending a run shifts counts up one column; never writing
                # past rollMax[j] is what keeps overlong runs impossible
                for c in range(2, limit + 1):
                    nxt[j][c] = dp[j][c - 1]
                # fresh run of face j: any sequence ending in a different face
                nxt[j][1] = (grand - totals[j]) % MOD
            dp = nxt
        # each legal sequence lands in exactly one cell (final face, run len)
        return sum(sum(row) for row in dp) % MOD
