from typing import List, Optional


class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        adj: dict = {}

        def connected(a: int, b: int) -> bool:
            stack = [a]
            seen = {a}
            # The stack explores depth-first and marks nodes on push, so
            # each node enters it at most once per probe.
            while stack:
                u = stack.pop()
                if u == b:
                    return True
                for v in adj.get(u, ()):
                    if v not in seen:
                        seen.add(v)
                        stack.append(v)
            return False

        # A tree plus one extra edge has exactly one cycle; the first edge
        # that closes it is the one to remove.
        for a, b in edges:
            # Probe before inserting: if b is already reachable from a
            # through the edges added so far, this edge closes the cycle.
            if connected(a, b):
                return [a, b]
            # A safe edge joins two previously separate parts: register it
            # in both directions and keep scanning.
            adj.setdefault(a, []).append(b)
            adj.setdefault(b, []).append(a)
        return []
