class Solution:
    def maxBuilding(self, n: int, restrictions: List[List[int]]) -> int:
        # Only restricted points (plus building 1 at height 0) matter.
        # Sort by id; two passes make each cap consistent with reachability
        # from its neighbors; between consecutive pinned points the best
        # peak is the floor of (lh + rh + gap) / 2, and past the last pin
        # the height simply ramps to its cap + distance.
        points = [(1, 0)] + sorted(restrictions)
        for k in range(1, len(points)):
            pi, ph = points[k - 1]
            ci, ch = points[k]
            if ph + (ci - pi) < ch:
                points[k] = (ci, ph + ci - pi)
        for k in range(len(points) - 2, -1, -1):
            ni, nh = points[k + 1]
            ci, ch = points[k]
            if nh + (ni - ci) < ch:
                points[k] = (ci, nh + ni - ci)
        best = 0
        for k in range(1, len(points)):
            li, lh = points[k - 1]
            ri, rh = points[k]
            best = max(best, (lh + rh + ri - li) // 2)
        li, lh = points[-1]
        return max(best, lh + n - li)
