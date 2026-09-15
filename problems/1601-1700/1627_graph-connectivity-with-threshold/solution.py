from typing import List, Optional


class Solution:
    def areConnected(self, n: int, threshold: int, queries: List[List[int]]) -> List[bool]:
        parent = list(range(n + 1))

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int) -> None:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        for z in range(threshold + 1, n + 1):
            if z > 1 and find(z) != z:
                # z is already merged with a smaller divisor; all its
                # multiples were merged with that divisor too.
                continue
            for multiple in range(2 * z, n + 1, z):
                union(z, multiple)

        return [find(a) == find(b) for a, b in queries]
