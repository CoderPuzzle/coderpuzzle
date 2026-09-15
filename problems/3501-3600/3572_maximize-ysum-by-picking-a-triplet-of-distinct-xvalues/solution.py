from typing import List


class Solution:
    def maxSumDistinctTriplet(self, x: List[int], y: List[int]) -> int:
        # Each x-value can enter the triplet at most once, so only its best
        # y matters: keep the maximum y per distinct x in a hash map.
        best = {}
        for xi, yi in zip(x, y):
            if yi > best.get(xi, 0):
                best[xi] = yi
        if len(best) < 3:
            return -1
        # The answer is the sum of the three largest per-x maxima.
        top3 = sorted(best.values(), reverse=True)[:3]
        return sum(top3)
