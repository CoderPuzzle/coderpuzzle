from typing import List


class Solution:
    def nimGame(self, piles: List[int]) -> bool:
        # Game-tree DP: the mover with no stones left to take loses, and a
        # position is won exactly when some move — pick a pile, reduce it —
        # strands the opponent on a lost position. Memoize on the sorted
        # pile vector: pile order never changes the move options, so every
        # distinct position is decided exactly once.
        memo = {}

        def wins(state: List[int]) -> bool:
            key = tuple(sorted(state))
            if key in memo:
                return memo[key]
            for i, remain in enumerate(key):
                for take in range(1, remain + 1):
                    nxt = list(key)
                    nxt[i] -= take
                    if not wins(nxt):
                        memo[key] = True
                        return True
            memo[key] = False
            return False

        return wins(piles)
