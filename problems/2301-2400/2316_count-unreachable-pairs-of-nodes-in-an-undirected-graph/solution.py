from typing import List, Optional


class Solution:
    def countPairs(self, n: int, edges: List[List[int]]) -> int:
        # reachability in an undirected graph is an equivalence, so the answer
        # is all pairs minus the pairs inside one connected component
        parent = list(range(n))
        size = [1] * n

        def find(x):
            # first pass locates the root, second rewires every visited node
            # directly to it: path compression without recursion
            root = x
            while parent[root] != root:
                root = parent[root]
            while parent[x] != root:
                parent[x], x = root, parent[x]
            return root

        for a, b in edges:
            ra, rb = find(a), find(b)
            if ra != rb:
                # union by size: the smaller tree hangs off the larger's root,
                # keeping trees shallow; size[root] stays the component's count
                if size[ra] < size[rb]:
                    ra, rb = rb, ra
                parent[rb] = ra
                size[ra] += size[rb]

        total_pairs = n * (n - 1) // 2
        # each component is counted exactly once, at its root; its C(s, 2)
        # pairs are mutually reachable, every other pair is not
        reachable = 0
        for v in range(n):
            if find(v) == v:
                reachable += size[v] * (size[v] - 1) // 2
        return total_pairs - reachable
