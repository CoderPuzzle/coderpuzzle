from typing import List


class Solution:
    def maxOutput(self, n: int, edges: List[List[int]], price: List[int]) -> int:
        if n == 1:
            return 0

        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Root at 0 once: BFS fixes parents and a top-down visit order,
        # so every later pass walks flat arrays and nothing recurses.
        parent = [-1] * n
        order = [0]
        for u in order:
            for v in adj[u]:
                if parent[v] == -1 and v != 0:
                    parent[v] = u
                    order.append(v)

        # d[v]: best price sum of an "arm", a vertical path starting at v
        # and descending into v's subtree. t1/t2/t1src remember the best
        # two child arms per node so the downward pass can hand each child
        # its "best arm excluding your own branch" value.
        d = [0] * n
        t1 = [0] * n
        t2 = [0] * n
        t1src = [-1] * n
        for v in reversed(order):
            d[v] = price[v] + t1[v]
            p = parent[v]
            if p >= 0:
                if d[v] > t1[p]:
                    t2[p] = t1[p]
                    t1[p] = d[v]
                    t1src[p] = v
                elif d[v] > t2[p]:
                    t2[p] = d[v]

        # Rerooting. The minimum path at any root is always the lone root,
        # which cancels against its own price inside every arm sum, so the
        # asked difference is exactly the largest arm leaving each node:
        # either straight down into a child subtree (t1) or climbing out
        # through the parent (up). Path sums stay <= n * max(price) =
        # 10^10, hence the native ints are safe and no widening is needed
        # beyond Python's arbitrary precision.
        up = [0] * n
        ans = t1[0]
        for i in range(1, n):
            v = order[i]
            p = parent[v]
            others = t2[p] if t1src[p] == v else t1[p]
            up[v] = price[p] + (others if others > up[p] else up[p])
            ans = max(ans, t1[v], up[v])
        return ans
