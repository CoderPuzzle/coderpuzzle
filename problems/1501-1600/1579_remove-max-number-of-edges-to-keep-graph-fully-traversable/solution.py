from typing import List, Optional


class Solution:
    def maxNumEdgesToRemove(self, n: int, edges: List[List[int]]) -> int:
        # Disjoint-set union with path compression and union-by-size: two
        # independent copies track what Alice and Bob can each reach, but
        # every Type 3 edge is unioned into both copies at once, since it
        # serves both of them for free.
        class DisjointSet:
            def __init__(self, size: int) -> None:
                self.parent = list(range(size + 1))
                self.components = size

            def find(self, node: int) -> int:
                while self.parent[node] != node:
                    self.parent[node] = self.parent[self.parent[node]]
                    node = self.parent[node]
                return node

            def union(self, a: int, b: int) -> bool:
                root_a, root_b = self.find(a), self.find(b)
                if root_a == root_b:
                    return False
                self.parent[root_a] = root_b
                self.components -= 1
                return True

        alice = DisjointSet(n)
        bob = DisjointSet(n)
        used = 0

        # Type 3 edges go first: whichever ones actually merge two
        # components help both Alice and Bob simultaneously, so they are
        # never worse than spending a Type 1 and a Type 2 edge instead.
        for edge_type, u, v in edges:
            if edge_type == 3:
                merged_alice = alice.union(u, v)
                merged_bob = bob.union(u, v)
                if merged_alice or merged_bob:
                    used += 1

        # Type 1 (Alice-only) and Type 2 (Bob-only) edges fill in whatever
        # the shared edges left disconnected, each within its own copy.
        for edge_type, u, v in edges:
            if edge_type == 1:
                if alice.union(u, v):
                    used += 1
            elif edge_type == 2:
                if bob.union(u, v):
                    used += 1

        if alice.components != 1 or bob.components != 1:
            return -1
        return len(edges) - used
