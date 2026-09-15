class Solution {

    public int[][] gameOfLife(int[][] board) {
        int m = board.length;
        int n = board[0].length;
        int[][] dirs = { { -1, -1 }, { -1, 0 }, { -1, 1 }, { 0, -1 }, { 0, 1 }, { 1, -1 }, { 1, 0 }, { 1, 1 } };
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int live = 0;
                for (int[] d : dirs) {
                    int nr = r + d[0];
                    int nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && (board[nr][nc] == 1 || board[nr][nc] == 2)) {
                        live++;
                    }
                }
                if (board[r][c] == 1 && (live < 2 || live > 3)) {
                    board[r][c] = 2; // live -> dead
                } else if (board[r][c] == 0 && live == 3) {
                    board[r][c] = 3; // dead -> live
                }
            }
        }
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                board[r][c] = board[r][c] == 1 || board[r][c] == 3 ? 1 : 0;
            }
        }
        return board;
    }
}
