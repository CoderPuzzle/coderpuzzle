from collections import deque
from typing import List, Optional


class Solution:
    def minRunesToAdd(self, n: int, crystals: List[int], flowFrom: List[int], flowTo: List[int]) -> int:
        graph = [[] for _ in range(n)]
        rgraph = [[] for _ in range(n)]
        for u, v in zip(flowFrom, flowTo):
            graph[u].append(v)
            rgraph[v].append(u)

        # Kosaraju SCC (iterative to avoid recursion-depth issues)
        visited = [False] * n
        order = []
        for start in range(n):
            if visited[start]:
                continue
            stack = [(start, 0)]
            visited[start] = True
            while stack:
                u, idx = stack[-1]
                if idx < len(graph[u]):
                    v = graph[u][idx]
                    stack[-1] = (u, idx + 1)
                    if not visited[v]:
                        visited[v] = True
                        stack.append((v, 0))
                else:
                    order.append(u)
                    stack.pop()

        comp = [-1] * n
        cid = 0
        for start in reversed(order):
            if comp[start] != -1:
                continue
            stack = [start]
            comp[start] = cid
            while stack:
                u = stack.pop()
                for v in rgraph[u]:
                    if comp[v] == -1:
                        comp[v] = cid
                        stack.append(v)
            cid += 1

        has_crystal = [False] * cid
        for c in crystals:
            has_crystal[comp[c]] = True

        cgraph = [[] for _ in range(cid)]
        in_deg = [0] * cid
        seen = set()
        for u in range(n):
            for v in graph[u]:
                cu, cv = comp[u], comp[v]
                if cu != cv and (cu, cv) not in seen:
                    seen.add((cu, cv))
                    cgraph[cu].append(cv)
                    in_deg[cv] += 1

        # BFS from crystal-containing components
        good = [False] * cid
        q = deque()
        for c in range(cid):
            if has_crystal[c]:
                good[c] = True
                q.append(c)
        while q:
            u = q.popleft()
            for v in cgraph[u]:
                if not good[v]:
                    good[v] = True
                    q.append(v)

        ans = 0
        for c in range(cid):
            if not good[c] and in_deg[c] == 0:
                ans += 1
        return ans
