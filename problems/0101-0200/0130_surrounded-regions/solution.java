import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public String[][] solve(String[][] board) {
        // Reverse the capture: a region keeps its 'O's exactly when it
        // touches the border, so flood-fill from the border 'O's and stamp
        // each survivor '#', a sentinel neither letter can collide with.
        int m = board.length;
        int n = board[0].length;
        Deque<int[]> stack = new ArrayDeque<>();
        for (int i = 0; i < m; ++i) {
            for (int j : new int[] { 0, n - 1 }) {
                if (board[i][j].equals("O")) {
                    board[i][j] = "#";
                    stack.push(new int[] { i, j });
                }
            }
        }
        for (int j = 0; j < n; ++j) {
            for (int i : new int[] { 0, m - 1 }) {
                if (board[i][j].equals("O")) {
                    board[i][j] = "#";
                    stack.push(new int[] { i, j });
                }
            }
        }
        // Explicit stack, not recursion: a safe region can span all 40000
        // cells of a 200 x 200 board, deeper than a call stack allows.
        int[][] steps = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
        while (!stack.isEmpty()) {
            int[] top = stack.pop();
            int i = top[0];
            int j = top[1];
            for (int[] step : steps) {
                int ni = i + step[0];
                int nj = j + step[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && board[ni][nj].equals("O")) {
                    board[ni][nj] = "#";
                    stack.push(new int[] { ni, nj });
                }
            }
        }
        // One closing sweep: stamped cells are the border-connected
        // survivors and revert to 'O'; every leftover 'O' is enclosed,
        // which is precisely the captured set, and becomes 'X'.
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (board[i][j].equals("#")) {
                    board[i][j] = "O";
                } else if (board[i][j].equals("O")) {
                    board[i][j] = "X";
                }
            }
        }
        // The capture happened inside the input allocation; the same board,
        // now captured, is what the judge compares.
        return board;
    }
}
