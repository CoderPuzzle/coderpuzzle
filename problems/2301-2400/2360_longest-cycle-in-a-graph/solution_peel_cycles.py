class Solution:
    def longestCycle(self, edges: list[int]) -> int:
        n = len(edges)
        # Count in-edges first; a node nobody points at is a queue seed.
        # edges[i] == -1 points nowhere and counts for nothing.
        indeg = [0] * n
        for v in edges:
            if v != -1:
                indeg[v] += 1
        # Kahn-style peel: repeatedly remove in-degree-0 nodes, dropping the
        # in-edge their out-edge contributed to a successor. What survives
        # the queue is exactly the set of cycle nodes.
        queue = [u for u in range(n) if indeg[u] == 0]
        head = 0
        while head < len(queue):
            u = queue[head]
            head += 1
            w = edges[u]
            if w != -1:
                indeg[w] -= 1
                if indeg[w] == 0:
                    queue.append(w)
        # Each survivor lies on a ring: walk it once, zeroing indeg as nodes
        # are counted so the walk stops exactly where it started.
        best = -1
        for start in range(n):
            if indeg[start] == 0:
                continue
            length = 0
            node = start
            while indeg[node] > 0:
                indeg[node] = 0
                length += 1
                node = edges[node]
            best = max(best, length)
        return best
