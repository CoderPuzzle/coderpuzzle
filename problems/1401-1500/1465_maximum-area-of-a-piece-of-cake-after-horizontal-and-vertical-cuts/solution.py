from typing import List


class Solution:
    def maxArea(
        self,
        h: int,
        w: int,
        horizontalCuts: List[int],
        verticalCuts: List[int],
    ) -> int:
        MOD = 10**9 + 7

        def widest(length: int, cuts: List[int]) -> int:
            edges = [0] + sorted(cuts) + [length]
            return max(edges[i + 1] - edges[i] for i in range(len(edges) - 1))

        return widest(h, horizontalCuts) * widest(w, verticalCuts) % MOD
