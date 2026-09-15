from typing import List, Optional


class Solution:
    def treeQueries(self, n: int, edges: List[List[int]], queries: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n + 1)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))

        parent = [0] * (n + 1)
        up_w = [0] * (n + 1)
        base = [0] * (n + 1)
        tin = [0] * (n + 1)
        tout = [0] * (n + 1)
        timer = 0
        stack = [(1, 0, 0, 0)]  # (node, parent, weight to parent, 0=enter/1=exit)
        while stack:
            u, p, w, state = stack.pop()
            if state == 0:
                parent[u] = p
                up_w[u] = w
                if p != 0:
                    base[u] = base[p] + w
                timer += 1
                tin[u] = timer
                stack.append((u, p, w, 1))
                for v, ww in reversed(adj[u]):
                    if v != p:
                        stack.append((v, u, ww, 0))
            else:
                tout[u] = timer

        size = n + 2
        bit = [0] * (size + 1)

        def add(i, val):
            while i <= size:
                bit[i] += val
                i += i & -i

        def point(i):
            s = 0
            while i > 0:
                s += bit[i]
                i -= i & -i
            return s

        answer = []
        for query in queries:
            if query[0] == 2:
                x = query[1]
                answer.append(base[x] + point(tin[x]))
            else:
                _, u, v, wp = query
                child = u if parent[u] == v else v
                delta = wp - up_w[child]
                up_w[child] = wp
                add(tin[child], delta)
                add(tout[child] + 1, -delta)
        return answer
