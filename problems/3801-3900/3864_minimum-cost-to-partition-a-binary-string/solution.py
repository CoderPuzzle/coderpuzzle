from typing import List, Optional


class Solution:
    def minCost(self, s: str, encCost: int, flatCost: int) -> int:
        # A segment's cost depends only on its length L and its count X of
        # ones: flatCost when X == 0, otherwise L * X * encCost. Because an
        # even segment may be split into two equal halves, the best value of
        # a segment is the cheaper of stopping here or paying for both
        # halves. The halves are disjoint intervals, so a plain recursion
        # visits each reachable segment exactly once and is O(n).
        n = len(s)
        prefix = [0] * (n + 1)
        for i, ch in enumerate(s):
            prefix[i + 1] = prefix[i] + (1 if ch == "1" else 0)

        def solve(l: int, length: int) -> int:
            x = prefix[l + length] - prefix[l]
            best = flatCost if x == 0 else length * x * encCost
            if length % 2 == 0:
                half = length // 2
                best = min(best, solve(l, half) + solve(l + half, half))
            return best

        return solve(0, n)
