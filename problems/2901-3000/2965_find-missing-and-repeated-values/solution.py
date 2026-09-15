from typing import List, Optional


class Solution:
    def findMissingAndRepeatedValues(self, grid: List[List[int]]) -> List[int]:
        # The grid holds [1, n*n] once each except one value twice and one
        # value never: flag each value in a seen array during one pass, and
        # a re-flagged value is the repeated a; the lone unflagged slot
        # afterward is the missing b.
        n = len(grid)
        seen = [False] * (n * n + 1)
        a = 0
        for row in grid:
            for v in row:
                if seen[v]:
                    a = v
                seen[v] = True
        b = 1
        while seen[b]:
            b += 1
        return [a, b]
