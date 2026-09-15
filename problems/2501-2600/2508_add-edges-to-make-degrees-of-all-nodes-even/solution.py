from typing import List


class Solution:
    def isPossible(self, n: int, edges: List[List[int]]) -> bool:
        # One added edge flips exactly two parities, so at most four
        # odd-degree nodes are repairable: two odds connect directly when
        # their edge slot is free, else both route through one fresh middle
        # node; four odds need a disjoint pairing of two free slots.
        degree = [0] * (n + 1)
        seen = set()
        for u, v in edges:
            degree[u] += 1
            degree[v] += 1
            seen.add((u, v) if u < v else (v, u))

        def linked(a, b):
            key = (a, b) if a < b else (b, a)
            return key in seen

        odds = [node for node in range(1, n + 1) if degree[node] & 1]
        if not odds:
            return True
        if len(odds) > 4:
            return False
        if len(odds) == 2:
            a, b = odds
            if not linked(a, b):
                return True
            return any(c != a and c != b and not linked(a, c) and not linked(b, c) for c in range(1, n + 1))
        w, x, y, z = odds
        return (
            (not linked(w, x) and not linked(y, z))
            or (not linked(w, y) and not linked(x, z))
            or (not linked(w, z) and not linked(x, y))
        )
