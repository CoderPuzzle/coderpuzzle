from typing import List, Optional


class Solution:
    def rootCount(self, edges: List[List[int]], guesses: List[List[int]], k: int) -> int:
        n = len(edges) + 1
        graph = [[] for _ in range(n)]
        for a, b in edges:
            graph[a].append(b)
            graph[b].append(a)
        # Guess set of (parent, child) tuples gives O(1) direction checks.
        guess_set = set(map(tuple, guesses))

        # Iterative DFS from root 0 records each node's parent and an order
        # where parents precede children — rerooting without recursion, which
        # also sidesteps recursion limits on deep trees.
        parent = [-1] * n
        order = []
        visited = [False] * n
        stack = [0]
        visited[0] = True
        while stack:
            u = stack.pop()
            order.append(u)
            for v in graph[u]:
                if not visited[v]:
                    visited[v] = True
                    parent[v] = u
                    stack.append(v)

        cnt = [0] * n
        # Correct-guess count for root 0: one point per edge whose
        # (parent, child) direction was guessed.
        for v in range(1, n):
            if (parent[v], v) in guess_set:
                cnt[0] += 1

        ans = 1 if cnt[0] >= k else 0
        for u in order[1:]:
            # Moving the root across edge p -> u flips only that one edge:
            # guess (p, u) becomes wrong and reversed guess (u, p) becomes
            # right. Parents come first in `order`, so cnt[p] is final here.
            p = parent[u]
            c = cnt[p]
            if (p, u) in guess_set:
                c -= 1
            if (u, p) in guess_set:
                c += 1
            cnt[u] = c
            if c >= k:
                ans += 1
        return ans
