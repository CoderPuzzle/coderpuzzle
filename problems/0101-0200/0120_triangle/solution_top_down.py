from typing import List, Optional


class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        # Top-down mirror of the bottom-up DP: best[i] = minimum path sum
        # from the apex down to column i of the current row.
        best = list(triangle[0])
        for row in triangle[1:]:
            # Fresh row: a cell descends from column i-1 or i of the row
            # above, so both ragged edge cells have a single parent.
            nxt = [row[0] + best[0]]
            for i in range(1, len(row) - 1):
                nxt.append(row[i] + min(best[i - 1], best[i]))
            nxt.append(row[-1] + best[-1])
            best = nxt
        # The answer is the cheapest cell on the final row.
        return min(best)
