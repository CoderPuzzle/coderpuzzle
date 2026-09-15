from typing import List, Optional


class Solution:
    def minimumCost(
        self,
        source: str,
        target: str,
        original: List[str],
        changed: List[str],
        cost: List[int],
    ) -> int:
        # A conversion rule is a directed edge in the 26-letter cost graph;
        # the cheapest a->b conversion is the shortest path a->b.
        INF = float("inf")
        dist = [[INF] * 26 for _ in range(26)]
        for i in range(26):
            dist[i][i] = 0
        for o, c, w in zip(original, changed, cost):
            a, b = ord(o) - 97, ord(c) - 97
            # Duplicate rules for the same pair just keep the minimum cost.
            if w < dist[a][b]:
                dist[a][b] = w
        # Floyd–Warshall: relax every pair through each intermediate letter.
        for m in range(26):
            row = dist[m]
            for i in range(26):
                di = dist[i]
                dim = di[m]
                if dim == INF:
                    continue
                for j in range(26):
                    nd = dim + row[j]
                    if nd < di[j]:
                        di[j] = nd
        total = 0
        for s, t in zip(source, target):
            # Matching characters convert for free.
            if s == t:
                continue
            d = dist[ord(s) - 97][ord(t) - 97]
            if d == INF:
                return -1
            total += d
        return total
