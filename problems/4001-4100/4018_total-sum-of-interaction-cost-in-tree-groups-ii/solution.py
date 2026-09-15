from typing import List


class Solution:
    def interactionCosts(self, n: int, edges: List[List[int]], group: List[int]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        # Breadth-first order from the root; parents discovered on the way.
        parent = [-1] * n
        order = [0]
        head = 0
        while head < len(order):
            node = order[head]
            head += 1
            for nxt in adj[node]:
                if nxt != parent[node]:
                    parent[nxt] = node
                    order.append(nxt)

        # Global size of each group label.
        k = [0] * (n + 1)
        for g in group:
            k[g] += 1

        # Each subtree state: [group -> count map, sum of k[g]*cnt_g,
        # sum of cnt_g^2]. Processing nodes in reverse discovery order
        # finishes every child before its parent.
        states = [None] * n
        ans = 0
        for v in reversed(order):
            pv = parent[v]

            base = None
            for c in adj[v]:
                if c != pv and (base is None or len(states[c][0]) > len(base[0])):
                    base = states[c]

            if base is None:
                base = [{}, 0, 0]
            counts, a, b = base

            g = group[v]
            counts[g] = counts.get(g, 0) + 1
            a += k[g]
            b += 2 * (counts[g] - 1) + 1

            for c in adj[v]:
                if c == pv or states[c] is base:
                    continue
                for gg, cc in states[c][0].items():
                    old = counts.get(gg, 0)
                    a += k[gg] * cc
                    b += 2 * old * cc + cc * cc
                    counts[gg] = old + cc
                states[c][0] = None

            if v != 0:
                # The edge above v carries sum of cnt*(k-cnt) = a - b.
                ans += a - b
            base[1] = a
            base[2] = b
            states[v] = base
        return ans
