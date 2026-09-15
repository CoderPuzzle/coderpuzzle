class Solution {

    public int[][] gameOfLife(int[][] board) {
        int m = board.length;
        int n = board[0].length;
        // Snapshot the current generation: every neighbor count must read
        // the old states even while the board itself is being overwritten.
        int[][] snapshot = new int[m][];
        for (int r = 0; r < m; r++) {
            snapshot[r] = board[r].clone();
        }
        int[][] dirs = { { -1, -1 }, { -1, 0 }, { -1, 1 }, { 0, -1 }, { 0, 1 }, { 1, -1 }, { 1, 0 }, { 1, 1 } };
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int live = 0;
                // Count live neighbors in the snapshot; cells outside the
                // board count as dead via the bounds check.
                for (int[] d : dirs) {
                    int nr = r + d[0];
                    int nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && snapshot[nr][nc] == 1) {
                        live++;
                    }
                }
                // Rules applied to the old state: live survives on 2 or 3,
                // dead is born on exactly 3, everything else dies/stays
                // dead.
                if (snapshot[r][c] == 1) {
                    board[r][c] = live == 2 || live == 3 ? 1 : 0;
                } else {
                    board[r][c] = live == 3 ? 1 : 0;
                }
            }
        }
        return board;
    }
}
