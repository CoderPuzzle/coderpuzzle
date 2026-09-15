from typing import List, Optional


class Solution:
    def maximumBooks(self, books: List[int]) -> int:
        n = len(books)
        # dp[i] = best total of a strictly increasing chain ending at i;
        # the rightmost shelf gives everything, so each take is books[i]-(i-x).
        dp = [0] * n
        # Monotonic stack of barrier candidates (nearest j where the chain dies).
        stack = []
        for i in range(n):
            bi = books[i]
            # Pop shelves x that still fit the demand books[i] - (i - x):
            # any future chain stopping past them stops at or before i.
            while stack and books[stack[-1]] >= bi - (i - stack[-1]):
                stack.pop()
            # Remaining top is the nearest barrier j; the chain covers j+1..i.
            j = stack[-1] if stack else -1
            if j >= 0:
                length = i - j
            else:
                # No barrier: the chain runs to shelf 0, but a shelf cannot
                # demand fewer than one book, so it caps at min(i, books[i])+1.
                length = min(i, bi) + 1  # stop where the sequence would go negative
            # Arithmetic sum of the run, spliced with dp[j]: shelf j tops out
            # strictly below the demanded value, so the two chains join validly.
            s = length * bi - length * (length - 1) // 2
            dp[i] = s + (dp[j] if j >= 0 else 0)
            stack.append(i)
        return max(dp) if dp else 0
