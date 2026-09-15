from typing import List, Optional

from functools import lru_cache


class Solution:
    def maxLen(self, n: int, edges: List[List[int]], label: str) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        # dp(mask, left, right): best length reachable when mask is the visited
        # set and left/right are the path endpoints. Invariant: the visited
        # nodes spell a palindrome read from left to right.
        @lru_cache(maxsize=None)
        def dp(mask, left, right):
            # The standing path already spells a palindrome, so its length is
            # the floor every extension must beat.
            best = bin(mask).count("1")
            # Grow outward by one matched pair: u glues onto the left end, v onto
            # the right end; they must be distinct, unvisited, and equally
            # labeled so the path stays palindromic.
            for u in adj[left]:
                if (mask >> u) & 1:
                    continue
                for v in adj[right]:
                    if u == v or (mask >> v) & 1:
                        continue
                    if label[u] != label[v]:
                        continue
                    cand = dp(mask | (1 << u) | (1 << v), u, v)
                    if cand > best:
                        best = cand
            return best

        # Every palindrome has a center: seed odd paths from each single node
        # and even paths from each equal-label adjacent pair.
        answer = 1
        for i in range(n):
            length = dp(1 << i, i, i)
            if length > answer:
                answer = length
        for u, v in edges:
            if label[u] == label[v]:
                length = dp((1 << u) | (1 << v), u, v)
                if length > answer:
                    answer = length
        return answer
