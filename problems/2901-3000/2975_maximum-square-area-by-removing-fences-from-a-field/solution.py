from typing import List


class Solution:
    def maximizeSquareArea(self, m: int, n: int, hFences: List[int], vFences: List[int]) -> int:
        # Adding the immovable border fences at 1 and outer makes every
        # surviving region width a pairwise difference of the positions.
        # The square side is the largest gap present in both directions.
        def all_gaps(outer: int, fences: List[int]) -> set:
            xs = sorted(fences + [1, outer])
            return {b - a for i, a in enumerate(xs) for b in xs[i + 1 :]}

        h_gaps = all_gaps(m, hFences)
        best = -1
        for d in all_gaps(n, vFences):
            if d > best and d in h_gaps:
                best = d
        return -1 if best < 0 else (best * best) % (10**9 + 7)
