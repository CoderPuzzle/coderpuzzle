from typing import List


class Solution:
    def numberOfSubmatrices(self, grid: List[List[str]]) -> int:
        # Every counted submatrix contains grid[0][0], so each candidate is
        # exactly the top-left rectangle ending at some cell. A running sum
        # over the current row plus the previous row's prefix sums gives each
        # rectangle's signed balance (X = +1, Y = -1); a parallel array gives
        # its X-count. Count cells whose balance is zero but which hold at
        # least one X.
        cols = len(grid[0])
        prev_sum = [0] * cols
        prev_x = [0] * cols
        total = 0
        for r, row in enumerate(grid):
            cur_sum = [0] * cols
            cur_x = [0] * cols
            run_sum = run_x = 0
            above = r > 0
            for c, cell in enumerate(row):
                if cell == "X":
                    run_sum += 1
                    run_x += 1
                elif cell == "Y":
                    run_sum -= 1
                s = run_sum
                x = run_x
                if above:
                    # rect(r, c) = row-run + rect(r - 1, c).
                    s += prev_sum[c]
                    x += prev_x[c]
                cur_sum[c] = s
                cur_x[c] = x
                if s == 0 and x > 0:
                    total += 1
            prev_sum = cur_sum
            prev_x = cur_x
        return total
