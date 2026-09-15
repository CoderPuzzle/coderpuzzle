from typing import List, Optional


class Solution:
    def leftmostBuildingQueries(self, heights: List[int], queries: List[List[int]]) -> List[int]:
        n = len(heights)
        # Max segment tree over heights, padded to a power of two: leaves hold
        # heights, each parent the max of its children.
        size = 1
        while size < n:
            size <<= 1
        seg = [0] * (2 * size)
        for i in range(n):
            seg[size + i] = heights[i]
        for i in range(size - 1, 0, -1):
            seg[i] = max(seg[2 * i], seg[2 * i + 1])

        # First index in [ql, qr) whose height exceeds threshold, or -1.

        def find_first(node, nl, nr, ql, qr, threshold):
            # Prune any node outside the query range or whose max cannot qualify.
            if nr <= ql or qr <= nl or seg[node] <= threshold:
                return -1
            if nr - nl == 1:
                return nl
            mid = (nl + nr) // 2
            # Left child first, so the first leaf reached is the leftmost hit.
            res = find_first(2 * node, nl, mid, ql, qr, threshold)
            if res != -1:
                return res
            return find_first(2 * node + 1, mid, nr, ql, qr, threshold)

        result = []
        # Movements only go rightward and strictly upward in height.
        for a, b in queries:
            if a > b:
                a, b = b, a
            if a == b:
                result.append(a)
            elif heights[a] < heights[b]:
                result.append(b)
            else:
                # The taller building sets the bar both must clear strictly
                # right of b; find the leftmost one above it.
                threshold = heights[a] if heights[a] > heights[b] else heights[b]
                result.append(find_first(1, 0, size, b + 1, n, threshold))
        return result
