from typing import List


class Solution:
    def canReachCorner(self, xCorner: int, yCorner: int, circles: List[List[int]]) -> bool:
        # Nodes 0..n-1 are the circles, then the top, right, bottom, and left
        # edges of the rectangle. Touching circles merge into obstacle blobs,
        # and a blob pinned to two edges blocks the corner-to-corner path
        # exactly for the pairs left-right, left-bottom, right-top, and
        # top-bottom: spanning walls cut the rectangle in half, while the
        # other two pairs fence off the start and goal corners themselves.
        # A circle covering a corner touches both adjacent edges at once.
        n = len(circles)
        top, right, bottom, left = n, n + 1, n + 2, n + 3
        parent = list(range(n + 4))

        def find(node: int) -> int:
            while parent[node] != node:
                parent[node] = parent[parent[node]]
                node = parent[node]
            return node

        def union(a: int, b: int) -> None:
            parent[find(a)] = find(b)

        def meets_edge(cx: int, cy: int, r2: int, fixed: int, vertical: bool) -> bool:
            # Squared distance from the center to the closest point of the
            # edge segment; integer-exact, so tangency counts as contact.
            px = fixed if vertical else min(max(cx, 0), xCorner)
            py = min(max(cy, 0), yCorner) if vertical else fixed
            return (cx - px) ** 2 + (cy - py) ** 2 <= r2

        for i, (x, y, r) in enumerate(circles):
            r2 = r * r
            if meets_edge(x, y, r2, yCorner, False):
                union(top, i)
            if meets_edge(x, y, r2, xCorner, True):
                union(right, i)
            if meets_edge(x, y, r2, 0, False):
                union(bottom, i)
            if meets_edge(x, y, r2, 0, True):
                union(left, i)
            for j in range(i):
                dx = x - circles[j][0]
                dy = y - circles[j][1]
                if dx * dx + dy * dy <= (r + circles[j][2]) ** 2:
                    union(i, j)

        if find(left) == find(right) or find(left) == find(bottom):
            return False
        return find(right) != find(top) and find(top) != find(bottom)
