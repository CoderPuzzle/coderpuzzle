from typing import List, Optional


class Solution:
    def countPaths(self, n: int, edges: List[List[int]]) -> int:
        # sieve of primes up to n
        prime = [True] * (n + 1)
        prime[0] = False
        if n >= 1:
            prime[1] = False
        p = 2
        while p * p <= n:
            if prime[p]:
                for multiple in range(p * p, n + 1, p):
                    prime[multiple] = False
            p += 1

        graph = [[] for _ in range(n + 1)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        parent = [0] * (n + 1)
        order = [1]
        for x in order:
            for y in graph[x]:
                if y != parent[x]:
                    parent[y] = x
                    order.append(y)

        # dp0[x] / dp1[x] = number of nodes y in subtree(x) whose path x..y
        # contains 0 / exactly 1 prime node.
        dp0 = [0] * (n + 1)
        dp1 = [0] * (n + 1)
        ans = 0
        for x in reversed(order):
            if prime[x]:
                dp0[x] = 0
                dp1[x] = 1
            else:
                dp0[x] = 1
                dp1[x] = 0
            total0 = 1 if not prime[x] else 0
            total1 = 1 if prime[x] else 0
            for y in graph[x]:
                if parent[y] != x:
                    continue
                if prime[x]:
                    c0 = 0
                    c1 = dp0[y]
                else:
                    c0 = dp0[y]
                    c1 = dp1[y]
                if prime[x]:
                    # need f(a) + f(b) == 2 (both endpoints one prime)
                    ans += total1 * c1
                else:
                    ans += total0 * c1 + total1 * c0
                total0 += c0
                total1 += c1
                if prime[x]:
                    dp1[x] += dp0[y]
                else:
                    dp0[x] += dp0[y]
                    dp1[x] += dp1[y]
        return ans
