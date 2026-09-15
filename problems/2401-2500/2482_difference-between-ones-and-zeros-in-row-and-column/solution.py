class Solution:
    def onesMinusZeros(self, grid: List[List[int]]) -> List[List[int]]:
        # Precompute each row's and column's one-count once; the zero
        # counts follow as n - onesRow and m - onesCol, collapsing the
        # cell formula to 2*onesRow + 2*onesCol - m - n.
        m, n = len(grid), len(grid[0])
        row_ones = [sum(row) for row in grid]
        col_ones = [sum(grid[i][j] for i in range(m)) for j in range(n)]
        return [[2 * row_ones[i] + 2 * col_ones[j] - m - n for j in range(n)] for i in range(m)]
