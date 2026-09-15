from typing import List


class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        # Fix the first child's share, then the other two just need b + c
        # = rest with both halves capped: the valid b values form the
        # consecutive range [max(0, rest - limit), min(limit, rest)].
        total = 0
        for first in range(min(n, limit) + 1):
            rest = n - first
            low = max(0, rest - limit)
            high = min(limit, rest)
            if high >= low:
                total += high - low + 1
        return total
