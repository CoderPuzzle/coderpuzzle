from typing import List


class Solution:
    def maxIntersectionCount(self, y: List[int]) -> int:
        # The count only changes when the line passes a vertex height, so
        # testing each compressed height v just above (v + 0.5) and exactly
        # at v suffices. Every segment stamps its half-level range
        # [lo, hi - 1] and its strict interior [lo + 1, hi - 1] into two
        # difference arrays; a prefix pass then reads both counts per
        # height, the at-level one plus a point for each vertex on the line.
        heights = sorted(set(y))
        rank = {h: i for i, h in enumerate(heights)}
        above = [0] * len(heights)
        at = [0] * len(heights)
        for a, b in zip(y, y[1:]):
            lo, hi = (a, b) if a < b else (b, a)
            above[rank[lo]] += 1
            above[rank[hi]] -= 1
            if hi - lo > 1:
                at[rank[lo] + 1] += 1
                at[rank[hi]] -= 1
        seen = {}
        for h in y:
            seen[h] = seen.get(h, 0) + 1
        best = 0
        spans_above = spans_at = 0
        for i, h in enumerate(heights):
            spans_above += above[i]
            spans_at += at[i]
            best = max(best, spans_above, spans_at + seen[h])
        return best
