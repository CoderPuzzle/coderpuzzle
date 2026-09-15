from typing import List, Optional


class Solution:
    def rangeAddQueries(self, n: int, queries: List[List[int]]) -> List[List[int]]:
        # 2-D difference trick applied row by row.
        diff = [[0] * (n + 1) for _ in range(n)]
        for r1, c1, r2, c2 in queries:
            for r in range(r1, r2 + 1):
                diff[r][c1] += 1
                diff[r][c2 + 1] -= 1
        mat = []
        for r in range(n):
            row = []
            running = 0
            for c in range(n):
                running += diff[r][c]
                row.append(running)
            mat.append(row)
        return mat
