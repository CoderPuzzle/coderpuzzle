from typing import List


class Solution:
    def maximumEnergy(self, energy: List[int], k: int) -> int:
        # The curse forces each start's journey: magician i jumps to
        # i + k, then i + 2k, and so on until the line ends. So dp[i],
        # the total gained when starting at i, obeys
        # dp[i] = energy[i] + dp[i + k]: one backward pass fills every
        # chain as a running suffix sum, and the answer is the largest
        # entry. Every journey holds at most n cells of magnitude up to
        # 1000, so |dp[i]| <= 10⁵ * 10³ = 10⁸ — small enough even for
        # 32 bits — and the arithmetic here stays exact regardless.
        n = len(energy)
        dp = [0] * n
        dp[n - 1] = energy[n - 1]
        best = dp[n - 1]
        for i in range(n - 2, -1, -1):
            nxt = dp[i + k] if i + k < n else 0
            dp[i] = energy[i] + nxt
            best = max(best, dp[i])
        return best
