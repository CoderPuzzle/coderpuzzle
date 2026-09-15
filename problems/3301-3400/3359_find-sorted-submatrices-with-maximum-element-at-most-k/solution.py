from typing import List


class Solution:
    def countSubmatrices(self, grid: List[List[int]], k: int) -> int:
        # Sweep row by row. run[j] is the longest non-increasing run of
        # cells <= k ending at column j in the current row, so a column
        # span of width w ending at j is row-valid exactly when run[j] >= w.
        # Per column, a monotonic stack of the run lengths seen so far keeps
        # the running sum of minima over every stack segment; that sum
        # counts the submatrices whose bottom-right corner is the current
        # cell (each top-row choice contributes its width-minimum choices
        # of left edge). The count reaches C(m+1,2)*C(n+1,2) ~ 2.5*10^11,
        # past 32 bits but below 2^53, so Python ints stay exact and
        # fixed-width languages widen to 64-bit.
        n = len(grid[0])
        stacks = [[] for _ in range(n)]  # per column: (value, width) pairs
        sums = [0] * n
        run = [0] * n
        total = 0
        for row in grid:
            prev_val = 0
            prev_run = 0
            for j in range(n):
                v = row[j]
                if v > k:
                    r = 0
                elif prev_run and prev_val >= v:
                    r = prev_run + 1
                else:
                    r = 1
                run[j] = r
                st = stacks[j]
                s = sums[j]
                w = 1
                while st and st[-1][0] >= r:
                    val, sw = st.pop()
                    s -= val * sw
                    w += sw
                st.append((r, w))
                s += r * w
                sums[j] = s
                total += s
                prev_val = v
                prev_run = r
        return total
