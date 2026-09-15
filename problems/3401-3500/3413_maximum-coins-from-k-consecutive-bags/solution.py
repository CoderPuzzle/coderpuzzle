from typing import List, Optional


class Solution:
    def maximumCoins(self, coins: List[List[int]], k: int) -> int:
        import bisect

        # Sort by left endpoint: a window can only intersect a contiguous
        # run of segments, which the prefix sum then covers in O(1).
        segments = sorted(coins, key=lambda s: s[0])
        n = len(segments)
        lefts = [s[0] for s in segments]
        rights = [s[1] for s in segments]
        cs = [s[2] for s in segments]
        # Each segment's total coin count, for summing fully covered runs.
        area = [cs[i] * (rights[i] - lefts[i] + 1) for i in range(n)]
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + area[i]

        def window(start):
            # Coins inside [start, start + k - 1]. `a` is the first segment
            # whose right end reaches the window; `b` the last whose left
            # end falls inside it.
            end = start + k - 1
            a = bisect.bisect_left(rights, start)
            b = bisect.bisect_right(lefts, end) - 1
            if a > b:
                # No segment intersects the window.
                return 0
            # Clip the two boundary segments to the window; the segments in
            # between are fully covered. Segments are disjoint, so clipping
            # both partial ends never double counts.
            lo_a = max(lefts[a], start)
            hi_a = min(rights[a], end)
            if a == b:
                # Window meets only one segment: plain density * clipped length.
                return cs[a] * (hi_a - lo_a + 1) if lo_a <= hi_a else 0
            lo_b = max(lefts[b], start)
            hi_b = min(rights[b], end)
            # Full run from the prefix sum, then swap each boundary segment's
            # full area for its clipped part.
            total = prefix[b + 1] - prefix[a]
            total += cs[a] * (hi_a - lo_a + 1) - area[a]
            total += cs[b] * (hi_b - lo_b + 1) - area[b]
            return total

        # An optimal window can always slide until its left end meets some li
        # or its right end meets some ri, so these 2n starts cover the optimum.
        # rights[i] - k + 1 may be negative; positions before 1 simply hold
        # nothing and the binary searches handle them.
        best = 0
        for i in range(n):
            for candidate in (lefts[i], rights[i] - k + 1):
                value = window(candidate)
                if value > best:
                    best = value
        return best
