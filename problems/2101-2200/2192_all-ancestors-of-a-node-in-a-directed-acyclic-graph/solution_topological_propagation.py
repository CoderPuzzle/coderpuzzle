from typing import List


class Solution:
    def getAncestors(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        # Kahn's order over the graph's natural direction: a node is dequeued
        # only once every incoming edge is consumed, so all of its direct
        # parents are final and its ancestor set is the union of each parent
        # plus that parent's already-computed set.
        from collections import deque

        children = [[] for _ in range(n)]
        parents = [[] for _ in range(n)]
        for u, v in edges:
            children[u].append(v)
            parents[v].append(u)

        indegree = [len(ps) for ps in parents]
        ancestors = [0] * n  # bitset of the nodes that reach this node
        queue = deque(v for v in range(n) if indegree[v] == 0)
        while queue:
            node = queue.popleft()
            mask = 0
            for parent in parents[node]:
                mask |= ancestors[parent] | (1 << parent)
            ancestors[node] = mask
            for child in children[node]:
                indegree[child] -= 1
                if indegree[child] == 0:
                    queue.append(child)
        return [[u for u in range(n) if ancestors[v] >> u & 1] for v in range(n)]
