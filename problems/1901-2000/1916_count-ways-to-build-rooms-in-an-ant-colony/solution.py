from typing import List, Optional


class Solution:
    def waysToBuildRooms(self, prevRoom: List[int]) -> int:
        MOD = 10**9 + 7
        n = len(prevRoom)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[prevRoom[i]].append(i)

        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = fact[i - 1] * i % MOD
        # Division becomes multiplication: one Fermat exponentiation inverts
        # fact[n], then invfact[i-1] = invfact[i]*i fills the table backwards —
        # avoiding one modpow per node.
        invfact = [1] * (n + 1)
        invfact[n] = pow(fact[n], MOD - 2, MOD)
        for i in range(n, 0, -1):
            invfact[i - 1] = invfact[i] * i % MOD

        # Recursion is off the table (n up to 1e5): stack-driven preorder puts
        # parents before descendants, so the reverse walk is a post-order.
        order = []
        stack = [0]
        while stack:
            u = stack.pop()
            order.append(u)
            stack.extend(children[u])

        size = [1] * n
        ways = [1] * n
        # Bottom-up: ways[u] = (size(u)-1)! * prod(ways[v] / size[v]!) — build u
        # first, then multinomial-interleave the children's already-valid orders.
        for u in reversed(order):
            total = 0
            w = 1
            for v in children[u]:
                total += size[v]
                w = w * invfact[size[v]] % MOD
                w = w * ways[v] % MOD
            size[u] = total + 1
            ways[u] = fact[total] * w % MOD
        return ways[0]
