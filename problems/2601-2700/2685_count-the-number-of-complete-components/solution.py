from typing import List


class Solution:
    def countCompleteComponents(self, n: int, edges: List[List[int]]) -> int:
        parent = list(range(n))
        size = [1] * n

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        for a, b in edges:
            ra, rb = find(a), find(b)
            if ra != rb:
                if size[ra] < size[rb]:
                    ra, rb = rb, ra
                parent[rb] = ra
                size[ra] += size[rb]

        edge_count = [0] * n
        for a, _ in edges:
            edge_count[find(a)] += 1

        complete = 0
        for v in range(n):
            if find(v) == v and edge_count[v] == size[v] * (size[v] - 1) // 2:
                complete += 1
        return complete
