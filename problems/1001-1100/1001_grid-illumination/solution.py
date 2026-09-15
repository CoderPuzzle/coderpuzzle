from collections import defaultdict
from typing import List, Optional


class Solution:
    def gridIllumination(self, n: int, lamps: List[List[int]], queries: List[List[int]]) -> List[bool]:
        row = defaultdict(int)
        col = defaultdict(int)
        diag = defaultdict(int)
        anti_diag = defaultdict(int)
        on = set()

        for x, y in lamps:
            if (x, y) in on:
                continue
            on.add((x, y))
            row[x] += 1
            col[y] += 1
            diag[x - y] += 1
            anti_diag[x + y] += 1

        ans = []
        for x, y in queries:
            illuminated = row[x] > 0 or col[y] > 0 or diag[x - y] > 0 or anti_diag[x + y] > 0
            ans.append(illuminated)

            for dx in (-1, 0, 1):
                for dy in (-1, 0, 1):
                    pos = (x + dx, y + dy)
                    if pos in on:
                        on.remove(pos)
                        px, py = pos
                        row[px] -= 1
                        col[py] -= 1
                        diag[px - py] -= 1
                        anti_diag[px + py] -= 1

        return ans
