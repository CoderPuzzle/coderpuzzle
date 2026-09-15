from typing import List, Optional
from collections import deque


class Solution:
    def maximumInvitations(self, favorite: List[int]) -> int:
        n = len(favorite)
        # favorite defines a functional graph: disjoint cycles with in-trees
        # hanging off them.
        indeg = [0] * n
        for f in favorite:
            indeg[f] += 1

        # Kahn-style peel of the acyclic nodes: after it, depth[v] is the
        # node count of the longest chain of non-cycle employees leading
        # directly into v (at least 1 — itself), i.e. the arm length a
        # 2-cycle can absorb on that side.
        depth = [1] * n
        q = deque(i for i in range(n) if indeg[i] == 0)
        while q:
            u = q.popleft()
            v = favorite[u]
            if depth[u] + 1 > depth[v]:
                depth[v] = depth[u] + 1
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)

        # Whatever still has positive indegree is a cycle node. A seating is
        # either one whole cycle >= 3 (outsiders can't join: every neighbor
        # seat is taken) or 2-cycles with both chains — and several pairs can
        # share one table, so those add up.
        max_cycle = 0
        pair_sum = 0
        visited = [False] * n
        for i in range(n):
            if indeg[i] > 0 and not visited[i]:
                cycle_len = 0
                cur = i
                while not visited[cur]:
                    visited[cur] = True
                    cycle_len += 1
                    cur = favorite[cur]
                if cycle_len == 2:
                    # The pair sits together; each side takes one chain.
                    pair_sum += depth[i] + depth[favorite[i]]
                elif cycle_len > max_cycle:
                    max_cycle = cycle_len

        return max(max_cycle, pair_sum)
