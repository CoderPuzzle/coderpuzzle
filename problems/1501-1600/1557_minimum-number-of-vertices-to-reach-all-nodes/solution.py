from typing import List, Optional


class Solution:
    def findSmallestSetOfVertices(self, n: int, edges: List[List[int]]) -> List[int]:
        # A node with no incoming edge can only ever be reached by itself,
        # so it must be a starting vertex. Every other node has at least
        # one incoming edge and is therefore reachable from wherever that
        # edge originates, so the in-degree-zero nodes are also sufficient.
        in_degree = [0] * n
        for _, to in edges:
            in_degree[to] += 1
        return [node for node in range(n) if in_degree[node] == 0]
