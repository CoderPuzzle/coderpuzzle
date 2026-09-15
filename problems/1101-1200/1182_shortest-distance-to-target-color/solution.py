from typing import List


class Solution:
    def shortestDistanceColor(self, colors: List[int], queries: List[List[int]]) -> List[int]:
        n = len(colors)
        INF = float("inf")
        # dist[i][c]: distance from i to nearest color c (1..3).
        dist = [[INF] * 4 for _ in range(n)]
        for c in (1, 2, 3):
            # Left-to-right sweep carrying the distance to the most
            # recent occurrence of c.
            last = INF
            for i in range(n):
                if colors[i] == c:
                    last = 0
                elif last != INF:
                    last += 1
                dist[i][c] = last
            # Mirror sweep keeps whichever side owns the closer one.
            last = INF
            for i in range(n - 1, -1, -1):
                if colors[i] == c:
                    last = 0
                elif last != INF:
                    last += 1
                if last < dist[i][c]:
                    dist[i][c] = last
        return [-1 if dist[i][c] == INF else dist[i][c] for i, c in queries]
