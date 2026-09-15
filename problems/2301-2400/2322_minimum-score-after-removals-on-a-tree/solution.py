from typing import List


class Solution:
    def minimumScore(self, nums: List[int], edges: List[List[int]]) -> int:
        n = len(nums)

        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Iterative DFS from node 0 with an explicit stack: tin/tout record
        # each subtree as the half-open interval [tin[u], tout[u]) of entry
        # stamps, so the ancestor test is a plain range check. Popping the
        # ~u marker is the post-order moment -- fold sub[u] into its parent
        # there, after every descendant has already contributed.
        tin = [0] * n
        tout = [0] * n
        parent = [-1] * n
        sub = nums[:]
        timer = 0
        stack = [0]
        while stack:
            u = stack.pop()
            if u >= 0:
                tin[u] = timer
                timer += 1
                stack.append(~u)
                for v in adj[u]:
                    if v != parent[u]:
                        parent[v] = u
                        stack.append(v)
            else:
                u = ~u
                tout[u] = timer
                p = parent[u]
                if p >= 0:
                    sub[p] ^= sub[u]

        total = sub[0]

        # Every edge is its child endpoint, so the pairs below run over all
        # ways to remove two edges. The three cases are exhaustive and
        # mutually exclusive, and in each the third component's XOR is
        # recovered from the other two.
        best = 1 << 62
        for x in range(1, n):
            sx = sub[x]
            tx = tin[x]
            ex = tout[x]
            tpx = total ^ sx
            for ty, sy, toy in zip(tin[x + 1 :], sub[x + 1 :], tout[x + 1 :]):
                if tx <= ty < ex:  # x is an ancestor of y
                    a, c = sy, tpx
                    b = sx ^ sy
                elif ty <= tx < toy:  # y is an ancestor of x
                    a, c = sx, total ^ sy
                    b = sx ^ sy
                else:  # disjoint subtrees
                    a, b, c = sx, sy, tpx ^ sy
                if a < b:
                    lo, hi = a, b
                else:
                    lo, hi = b, a
                if c < lo:
                    lo = c
                elif c > hi:
                    hi = c
                if hi - lo < best:
                    best = hi - lo
        return best
