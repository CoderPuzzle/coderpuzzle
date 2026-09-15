from typing import List


class Solution:
    def findMedian(self, n: int, edges: List[List[int]], queries: List[List[int]]) -> List[int]:
        # Root the tree at 0 with an explicit stack (a 10^5-node chain
        # would blow the recursion limit), recording parent, depth and
        # weighted root distance. Binary lifting then answers each
        # query in O(log n): lift to the LCA l, take the total path
        # weight tot and the cumulative sum acc from u to l. "Sum >=
        # tot/2" is tested as 2 * sum >= tot so no halves appear; all
        # distances fit in 64 bits (n * max_w <= 10^14).
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))
        parent = [0] * n
        depth = [0] * n
        dist = [0] * n
        seen = [False] * n
        seen[0] = True
        stack = [0]
        while stack:
            u = stack.pop()
            for v, w in adj[u]:
                if not seen[v]:
                    seen[v] = True
                    parent[v] = u
                    depth[v] = depth[u] + 1
                    dist[v] = dist[u] + w
                    stack.append(v)
        log = 1
        while (1 << log) < n:
            log += 1
        up = [parent]
        for k in range(1, log):
            prev = up[k - 1]
            up.append([prev[prev[v]] for v in range(n)])
        answer = []
        for a, b in queries:
            if a == b:
                # Single-node path: the sum from a to itself (0) already
                # meets half of the zero total, so a is the median.
                answer.append(a)
                continue
            u, v = a, b
            if depth[u] < depth[v]:
                u, v = v, u
            diff = depth[u] - depth[v]
            k = 0
            while diff:
                if diff & 1:
                    u = up[k][u]
                diff >>= 1
                k += 1
            l = v
            if u != v:
                for k in range(log - 1, -1, -1):
                    if up[k][u] != up[k][v]:
                        u = up[k][u]
                        v = up[k][v]
                l = parent[u]
            tot = dist[a] + dist[b] - 2 * dist[l]
            acc = dist[a] - dist[l]
            if 2 * acc >= tot:
                # Median on the a -> l stretch. Climb from a while the
                # criterion still fails; the parent of the deepest
                # failing node is the first one that satisfies it.
                x = a
                for k in range(log - 1, -1, -1):
                    t = up[k][x]
                    if depth[t] >= depth[l] and 2 * (dist[a] - dist[t]) < tot:
                        x = t
                answer.append(parent[x])
            else:
                # Median on the l -> b stretch. Climb from b while the
                # criterion still holds; the highest such node (never l
                # itself, which failed) is the median.
                x = b
                for k in range(log - 1, -1, -1):
                    t = up[k][x]
                    if depth[t] > depth[l] and 2 * (acc + dist[t] - dist[l]) >= tot:
                        x = t
                answer.append(x)
        return answer
