class Solution {

    // Sweep the rows in zigzag order (even rows left-to-right, odd rows
    // reversed) flipping a take/skip toggle at every cell.
    public int[] zigzagTraversal(int[][] grid) {
        int total = 0;
        for (int[] row : grid) {
            total += row.length;
        }
        int[] result = new int[(total + 1) / 2];
        int out = 0;
        boolean take = true;
        for (int i = 0; i < grid.length; i++) {
            if (i % 2 == 0) {
                for (int j = 0; j < grid[i].length; j++) {
                    if (take) result[out++] = grid[i][j];
                    take = !take;
                }
            } else {
                for (int j = grid[i].length - 1; j >= 0; j--) {
                    if (take) result[out++] = grid[i][j];
                    take = !take;
                }
            }
        }
        return result;
    }
}
