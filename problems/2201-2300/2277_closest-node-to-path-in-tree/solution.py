from typing import List


class Solution:
    def closestNode(self, n: int, edges: List[List[int]], query: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Breadth-first walk from the root records parents and depths
        # without recursion, so chain-shaped trees cannot overflow the
        # call stack.
        parent = [-1] * n
        depth = [0] * n
        visited = [False] * n
        visited[0] = True
        order = [0]
        head = 0
        while head < len(order):
            u = order[head]
            head += 1
            for v in adj[u]:
                if not visited[v]:
                    visited[v] = True
                    parent[v] = u
                    depth[v] = depth[u] + 1
                    order.append(v)

        # up[k][v] is the 2^k-th ancestor of v, or -1 once past the root;
        # ceil(log2(n)) levels cover every upward jump on an n-node tree.
        LOG = max(1, (n - 1).bit_length())
        up = [parent[:]]
        for _ in range(1, LOG):
            prev = up[-1]
            up.append([prev[x] if x != -1 else -1 for x in prev])

        def lca(u: int, v: int) -> int:
            if depth[u] < depth[v]:
                u, v = v, u
            diff = depth[u] - depth[v]
            k = 0
            while diff:
                if diff & 1:
                    u = up[k][u]
                diff >>= 1
                k += 1
            if u == v:
                return u
            for k in range(LOG - 1, -1, -1):
                if up[k][u] != up[k][v]:
                    u = up[k][u]
                    v = up[k][v]
            return parent[u]

        # The deepest of the three pairwise LCAs is where node's route
        # merges onto the start-end path -- always on the path, and the
        # unique minimizer of the distance to it.
        answer = []
        for s, e, q in query:
            best = lca(s, e)
            for cand in (lca(s, q), lca(e, q)):
                if depth[cand] > depth[best]:
                    best = cand
            answer.append(best)
        return answer
