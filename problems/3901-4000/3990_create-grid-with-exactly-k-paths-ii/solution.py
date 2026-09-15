from typing import List


class Solution:
    def createGrid(self, k: int) -> List[str]:
        e = k.bit_length() - 1  # highest set bit; doublers 1..e form the chain
        if e == 0:
            return ["."]

        width = 2 * e + 4  # collector column 2e+3 at the right edge
        grid = [["#"] * width for _ in range(2 * e + 1)]
        grid[0][0] = grid[0][1] = "."  # start feeds doubler 1's entry (0, 2)
        for d in range(1, e + 1):
            for i in (2 * d - 2, 2 * d - 1):  # open 2x2 doubler
                for j in (2 * d, 2 * d + 1):
                    grid[i][j] = "."
            if d < e:
                # forced down-then-right connector; the right-then-down
                # alternative cell (2d-1, 2d+2) stays an obstacle
                grid[2 * d][2 * d + 1] = "."

        top = 2 * e
        for b in range(e):  # bit b shunts right from doubler (b+1)'s top-right
            if (k >> b) & 1:
                for j in range(2 * b + 4, 2 * e + 4):
                    grid[2 * b][j] = "."
                top = min(top, 2 * b)
        # leading bit e: the chain exit drops one row, below every other
        # shunt, then runs right to the collector column
        grid[2 * e][2 * e + 1] = "."
        for j in range(2 * e + 2, 2 * e + 4):
            grid[2 * e][j] = "."
        for i in range(top, 2 * e + 1):  # collector column descends to (2e, 2e+3)
            grid[i][2 * e + 3] = "."
        return ["".join(row) for row in grid]
