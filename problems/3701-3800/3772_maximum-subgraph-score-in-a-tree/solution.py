from typing import List, Optional

NEG = -(10**18)


class Solution:
    def maxSubgraphScore(self, n: int, edges: List[List[int]], good: List[int]) -> List[int]:
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Iterative DFS (explicit stack): safe on deep trees; records parent,
        # children, and an order where every parent precedes its children.
        parent = [-1] * n
        children = [[] for _ in range(n)]
        order = []
        stack = [0]
        parent[0] = -2
        while stack:
            u = stack.pop()
            order.append(u)
            for v in adj[u]:
                if v == parent[u]:
                    continue
                parent[v] = u
                children[u].append(v)
                stack.append(v)

        # +1 for good, -1 for bad: a connected subgraph's score is its weight
        # sum, so the task is the max-weight connected subgraph through u.
        weight = [1 if g else -1 for g in good]

        # down[u]: best score of a connected subgraph confined to u's subtree:
        # weight[u] plus each child's down only when positive, pruning harmful
        # branches. Reverse order computes children before parents.
        down = [0] * n
        for u in reversed(order):
            s = weight[u]
            for c in children[u]:
                if down[c] > 0:
                    s += down[c]
            down[u] = s

        # up[u]: best connected piece reaching u only through its parent side
        # (u's own subtree excluded); the NEG sentinel gives the root none.
        up = [0] * n
        up[0] = NEG
        result = [0] * n
        # Reroot in one preorder pass: each child inherits the parent plus u's
        # other worthwhile branches plus whatever the rest of the tree gave u;
        # dropping the child's own positive part keeps the two sides disjoint.
        for u in order:
            total_pos = sum(max(0, down[c]) for c in children[u])
            for c in children[u]:
                up[c] = weight[u] + (total_pos - max(0, down[c])) + max(0, up[u])
            # Answer for u: its weight, its positive child branches, and the
            # optional parent-side piece.
            result[u] = weight[u] + total_pos + max(0, up[u])
        return result
