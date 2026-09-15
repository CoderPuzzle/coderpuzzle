from typing import List


class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        # The triangle defines its own recurrence: row 0 is a lone 1, and every
        # later row carries a 1 at each end with each interior cell the sum of
        # the two cells directly above it. Building top-down means the row
        # above is already complete when any of its sums are read.
        rows = [[1]]
        for _ in range(1, numRows):
            above = rows[-1]
            row = [1]
            # Interior cell j is above[j - 1] + above[j]: the two cells that
            # touch it from directly above, with the edge 1s supplying the
            # missing neighbors of the outermost interior cells.
            for j in range(1, len(above)):
                row.append(above[j - 1] + above[j])
            row.append(1)
            rows.append(row)
        return rows
