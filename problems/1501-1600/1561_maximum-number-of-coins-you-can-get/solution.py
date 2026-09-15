from typing import List, Optional


class Solution:
    def maxCoins(self, piles: List[int]) -> int:
        # Sort ascending. Bob permanently absorbs the n smallest piles
        # (indices 0..n-1); of what's left, you take every other pile
        # starting at index n, and Alice takes the rest.
        piles.sort()
        n = len(piles) // 3
        total = 0
        idx = n
        for _ in range(n):
            total += piles[idx]
            idx += 2
        return total
