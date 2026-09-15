from typing import List


class Solution:
    def minDayskVariants(self, points: List[List[int]], k: int) -> int:
        # At day t a variant reaches exactly the L1 ball of radius t around
        # its origin, so the answer is min over every lattice point p of the
        # k-th smallest L1 distance from p to the n origins. Any point
        # outside the bounding box can be projected onto the box, which only
        # shrinks every distance, so the minimizer lies inside it. With
        # coordinates bounded by 100 the box has at most 100*100 points and
        # n <= 50, so sorting the n distances per point is cheap.
        xs = [x for x, _ in points]
        ys = [y for _, y in points]
        best = 10**9
        for x in range(min(xs), max(xs) + 1):
            for y in range(min(ys), max(ys) + 1):
                dists = [abs(x - xi) + abs(y - yi) for xi, yi in points]
                dists.sort()
                if dists[k - 1] < best:
                    best = dists[k - 1]
        return best
