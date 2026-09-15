from typing import List, Optional


class Solution:
    def minimumWhiteTiles(self, floor: str, numCarpets: int, carpetLen: int) -> int:
        # dp[i][j] is the fewest white tiles still visible among floor[i:]
        # when at most j carpets remain. Tile i is either left showing — and
        # pays floor[i] on top of dp[i+1][j] — or a carpet is laid with its
        # left end exactly at i, hiding i..i+carpetLen-1 and jumping the
        # state to dp[min(i+carpetLen, n)][j-1]. Filling i downward and j
        # upward leaves every reference already computed, and the j = 0 row
        # is just the suffix white counts. dp[0][numCarpets] answers for the
        # whole floor; overlapping or wasted carpets cost nothing because
        # the recurrence takes a minimum, never a sum, over placements.
        n = len(floor)
        dp = [[0] * (numCarpets + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            white = ord(floor[i]) - 48
            dp[i][0] = dp[i + 1][0] + white
            covered = min(i + carpetLen, n)
            for j in range(1, numCarpets + 1):
                dp[i][j] = min(dp[i + 1][j] + white, dp[covered][j - 1])
        return dp[0][numCarpets]
