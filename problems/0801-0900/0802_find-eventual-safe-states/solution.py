from typing import List, Optional


class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        n = len(graph)
        # Kahn's peel on the reversed graph: a node is safe exactly
        # when every path from it terminates.
        outdeg = [len(adj) for adj in graph]
        radj = [[] for _ in range(n)]
        for u, adj in enumerate(graph):
            for v in adj:
                radj[v].append(u)
        # Terminal nodes (out-degree 0) are trivially safe seeds.
        queue = [i for i in range(n) if outdeg[i] == 0]
        head = 0
        safe = [False] * n
        while head < len(queue):
            u = queue[head]
            head += 1
            safe[u] = True
            # A predecessor queues only once every outgoing neighbor
            # is proven safe — the definition of a safe node.
            for v in radj[u]:
                outdeg[v] -= 1
                if outdeg[v] == 0:
                    queue.append(v)
        # Unpeeled nodes are exactly those on, or reaching, a cycle;
        # the ascending scan yields the required sorted order.
        return [i for i in range(n) if safe[i]]
