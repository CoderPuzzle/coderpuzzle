from typing import List


class Solution:
    def numIslands2(self, m: int, n: int, positions: List[List[int]]) -> List[int]:
        # Union-find over flattened cell ids r * n + c keeps the island count
        # incremental; no full grid rescan after each add-land.
        parent = list(range(m * n))
        size = [1] * (m * n)
        land = [False] * (m * n)

        def find(x: int) -> int:
            # Path halving: splice x onto its grandparent, flattening chains.
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        count = 0
        answer = []
        for r, c in positions:
            cell = r * n + c
            # A repeated position changes nothing; re-emit the current count.
            if land[cell]:
                answer.append(count)
                continue
            # The new land starts as its own island before any merges.
            land[cell] = True
            count += 1
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and land[nr * n + nc]:
                    # Distinct roots mean two islands merge, losing one count;
                    # a later neighbor of the same island re-finds the merged
                    # root, so no extra decrement sneaks in.
                    ra, rb = find(cell), find(nr * n + nc)
                    if ra != rb:
                        # Union by size: attach the smaller tree underneath.
                        if size[ra] < size[rb]:
                            ra, rb = rb, ra
                        parent[rb] = ra
                        size[ra] += size[rb]
                        count -= 1
            answer.append(count)
        return answer
