class Solution {

    public int countUnguarded(int m, int n, int[][] guards, int[][] walls) {
        final int WALL = 1,
            GUARD = 2,
            GUARDED = 3;
        int[][] grid = new int[m][n];
        for (int[] wall : walls) {
            grid[wall[0]][wall[1]] = WALL;
        }
        for (int[] guard : guards) {
            grid[guard[0]][guard[1]] = GUARD;
        }
        for (int[] guard : guards) {
            for (int[] d : new int[][] { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } }) {
                int row = guard[0] + d[0],
                    col = guard[1] + d[1];
                while (
                    row >= 0 && row < m && col >= 0 && col < n && grid[row][col] != WALL && grid[row][col] != GUARD
                ) {
                    grid[row][col] = GUARDED;
                    row += d[0];
                    col += d[1];
                }
            }
        }
        int count = 0;
        for (int[] row : grid) {
            for (int cell : row) {
                if (cell == 0) {
                    count++;
                }
            }
        }
        return count;
    }
}
