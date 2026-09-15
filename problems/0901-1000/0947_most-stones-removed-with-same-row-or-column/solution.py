from typing import List


class Solution:
    def removeStones(self, stones: List[List[int]]) -> int:
        # Stones joined by shared rows and columns split the plane into
        # connected components. Inside a component of k stones any k - 1 can
        # go: peel the component down to one survivor, every removal still
        # sharing a row or column with a stone that remains. Stones of
        # different components never share a line, so the answer is n minus
        # the number of components — union-find merges each stone with the
        # first stone registered in its row and in its column, and the roots
        # count the components.
        n = len(stones)
        parent = list(range(n))
        size = [1] * n

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int) -> None:
            ra, rb = find(a), find(b)
            if ra == rb:
                return
            if size[ra] < size[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            size[ra] += size[rb]

        first_in_row = {}
        first_in_col = {}
        for i, (x, y) in enumerate(stones):
            if x in first_in_row:
                union(i, first_in_row[x])
            else:
                first_in_row[x] = i
            if y in first_in_col:
                union(i, first_in_col[y])
            else:
                first_in_col[y] = i

        components = sum(1 for i in range(n) if find(i) == i)
        return n - components
