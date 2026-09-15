from typing import List


class Solution:
    def removeStones(self, stones: List[List[int]]) -> int:
        # Row-or-column adjacency splits the stones into connected
        # components, and a component of k stones gives up k - 1 of them, so
        # the answer is n minus the number of components. Rather than encode
        # the merging, walk it: bucket the stone indices by row and by
        # column, then depth-first search from every stone not yet reached,
        # expanding through both of its buckets. Each bucket is popped the
        # first time it is expanded, so the whole shared line is absorbed at
        # once and no bucket is ever scanned twice.
        n = len(stones)
        rows: dict = {}
        cols: dict = {}
        for i, (x, y) in enumerate(stones):
            rows.setdefault(x, []).append(i)
            cols.setdefault(y, []).append(i)

        visited = [False] * n
        components = 0
        for start in range(n):
            if visited[start]:
                continue
            components += 1
            visited[start] = True
            stack = [start]
            while stack:
                u = stack.pop()
                x, y = stones[u]
                for bucket, key in ((rows, x), (cols, y)):
                    group = bucket.pop(key, None)
                    if group is None:
                        continue
                    for v in group:
                        if not visited[v]:
                            visited[v] = True
                            stack.append(v)

        return n - components
