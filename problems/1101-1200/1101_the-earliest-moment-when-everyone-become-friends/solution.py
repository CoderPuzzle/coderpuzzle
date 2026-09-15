from typing import List, Optional


class Solution:
    def earliestAcq(self, logs: List[List[int]], n: int) -> int:
        parent = list(range(n))

        # Path-halving find keeps the trees shallow across replays.
        def find(a: int) -> int:
            while parent[a] != a:
                parent[a] = parent[parent[a]]
                a = parent[a]
            return a

        # Replay events chronologically; the component counter tracks group
        # count so no global scan is ever needed.
        components = n
        for timestamp, x, y in sorted(logs):
            rx, ry = find(x), find(y)
            # Redundant (already-friends) events merge nothing.
            if rx != ry:
                parent[rx] = ry
                components -= 1
                # This merge closed the last divide: everyone is acquainted.
                if components == 1:
                    return timestamp
        return -1
