from typing import Dict, List


class Solution:
    def countCornerRectangles(self, grid: List[List[int]]) -> int:
        # Scan the rows top to bottom. Every pair of 1-columns in the current
        # row completes one rectangle with each earlier row that already
        # showed the same column pair, so a counter on column pairs charges
        # exactly one unit of work per rectangle.
        n = len(grid[0])
        pair_rows: Dict[int, int] = {}
        total = 0
        for row in grid:
            ones = [c for c in range(n) if row[c] == 1]
            for i in range(len(ones)):
                base = ones[i] * n
                for j in range(i + 1, len(ones)):
                    key = base + ones[j]
                    earlier = pair_rows.get(key, 0)
                    total += earlier
                    pair_rows[key] = earlier + 1
        return total
