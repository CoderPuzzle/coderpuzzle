class Solution {

    private int rows;
    private int cols;

    public int minDays(int[][] grid) {
        rows = grid.length;
        cols = grid[0].length;

        if (islandCount(grid) != 1) {
            return 0;
        }

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    grid[r][c] = 0;
                    boolean disconnected = islandCount(grid) != 1;
                    grid[r][c] = 1;
                    if (disconnected) {
                        return 1;
                    }
                }
            }
        }

        return 2;
    }

    private int islandCount(int[][] grid) {
        boolean[][] seen = new boolean[rows][cols];
        int count = 0;
        int[][] directions = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1 && !seen[r][c]) {
                    count++;
                    int[] stackR = new int[rows * cols];
                    int[] stackC = new int[rows * cols];
                    int top = 0;
                    stackR[top] = r;
                    stackC[top] = c;
                    top++;
                    seen[r][c] = true;
                    while (top > 0) {
                        top--;
                        int cr = stackR[top];
                        int cc = stackC[top];
                        for (int[] d : directions) {
                            int nr = cr + d[0];
                            int nc = cc + d[1];
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !seen[nr][nc]) {
                                seen[nr][nc] = true;
                                stackR[top] = nr;
                                stackC[top] = nc;
                                top++;
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
}
