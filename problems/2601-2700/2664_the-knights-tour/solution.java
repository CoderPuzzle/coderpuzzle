import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    private static final int[] DR = { 1, 2, 2, 1, -1, -2, -2, -1 };
    private static final int[] DC = { 2, 1, -1, -2, -2, -1, 1, 2 };

    public int[][] tourOfKnight(int m, int n, int r, int c) {
        int[][] board = new int[m][n];
        for (int[] row : board) {
            Arrays.fill(row, -1);
        }
        board[r][c] = 0;
        walk(board, m, n, r, c, 1);
        return board;
    }

    private boolean walk(int[][] board, int m, int n, int row, int col, int order) {
        if (order == m * n) {
            return true;
        }
        List<int[]> choices = new ArrayList<>();
        for (int k = 0; k < 8; k++) {
            int nr = row + DR[k];
            int nc = col + DC[k];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] == -1) {
                choices.add(new int[] { onward(board, m, n, nr, nc), nr, nc });
            }
        }
        choices.sort((a, b) -> a[0] - b[0]);
        for (int[] choice : choices) {
            board[choice[1]][choice[2]] = order;
            if (walk(board, m, n, choice[1], choice[2], order + 1)) {
                return true;
            }
            board[choice[1]][choice[2]] = -1;
        }
        return false;
    }

    private int onward(int[][] board, int m, int n, int row, int col) {
        int count = 0;
        for (int k = 0; k < 8; k++) {
            int nr = row + DR[k];
            int nc = col + DC[k];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] == -1) {
                count++;
            }
        }
        return count;
    }
}
