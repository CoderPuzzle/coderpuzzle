from typing import List, Optional


class Solution:
    def maximumScore(self, scores: List[int], edges: List[List[int]]) -> int:
        n = len(scores)
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # keep only the 3 highest-scoring neighbours of each node
        top3 = [sorted(neighbors, key=lambda v: -scores[v])[:3] for neighbors in adj]

        best = -1
        for a, b in edges:
            base = scores[a] + scores[b]
            for x in top3[a]:
                if x == b:
                    continue
                for y in top3[b]:
                    if y == a or x == y:
                        continue
                    total = base + scores[x] + scores[y]
                    if total > best:
                        best = total
        return best
