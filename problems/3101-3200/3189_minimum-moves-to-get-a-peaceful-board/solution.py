from typing import List


class Solution:
    def minMoves(self, rooks: List[List[int]]) -> int:
        # Horizontal and vertical moves touch disjoint coordinates, and a
        # peaceful board needs row indices {0..n-1} once each (columns too).
        # So each axis decouples: pair the k-th smallest coordinate of that
        # axis with target index k-1 — rearrangement keeps this optimal.
        # Worst case per axis is n*(n-1)//2 <= 124750, so everything stays
        # far inside 32 bits.
        xs = sorted(x for x, _ in rooks)
        ys = sorted(y for _, y in rooks)
        return sum(abs(x - i) for i, x in enumerate(xs)) + sum(abs(y - i) for i, y in enumerate(ys))
