from typing import List, Optional


class Solution:
    def superEggDrop(self, k: int, n: int) -> int:
        # dp[e]: floors resolvable with `moves` moves and e eggs; grow the
        # move count until k eggs cover all n floors.
        dp = [0] * (k + 1)
        moves = 0
        while dp[k] < n:
            moves += 1
            # One drop settles its own floor plus the below-case (e - 1 eggs)
            # and the above-case (e eggs), each with one move fewer. Sweeping
            # e downward keeps dp[e - 1] at the previous move's value — the
            # in-place 0/1 knapsack trick.
            for e in range(k, 0, -1):
                dp[e] = dp[e - 1] + dp[e] + 1
        return moves
