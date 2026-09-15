from typing import List


class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        n = len(piles)
        suf = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suf[i] = suf[i + 1] + piles[i]
        # dp[i][m]: max stones the player to move collects from piles[i:]
        # when the current M is m. dp[n][*] = 0.
        dp = [[0] * (n + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            for m in range(1, n + 1):
                limit = min(2 * m, n - i)
                best = 0
                for x in range(1, limit + 1):
                    m2 = min(max(m, x), n)
                    # taking x piles hands over (i + x, max(m, x)); the two
                    # players split the whole suffix, so the mover's haul is
                    # the suffix total minus the opponent's optimal dp
                    cand = suf[i] - dp[i + x][m2]
                    if cand > best:
                        best = cand
                dp[i][m] = best
        return dp[0][1]
