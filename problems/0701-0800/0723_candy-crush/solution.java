class Solution {

    public int[][] candyCrush(int[][] board) {
        // One round: flag every candy inside a horizontal or vertical run
        // of three or more equal values, empty the flagged cells, then let
        // gravity settle every column. Both sweeps read the untouched
        // board, so the flags land simultaneously — an L or T of one candy
        // type loses all of its cells in a single round. Repeat until a
        // round flags nothing; that board is stable.
        int rows = board.length;
        int cols = board[0].length;
        while (true) {
            boolean[][] marked = new boolean[rows][cols];
            boolean crushed = false;
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j + 2 < cols; j++) {
                    int value = board[i][j];
                    if (value != 0 && value == board[i][j + 1] && value == board[i][j + 2]) {
                        marked[i][j] = marked[i][j + 1] = marked[i][j + 2] = true;
                        crushed = true;
                    }
                }
            }
            for (int j = 0; j < cols; j++) {
                for (int i = 0; i + 2 < rows; i++) {
                    int value = board[i][j];
                    if (value != 0 && value == board[i + 1][j] && value == board[i + 2][j]) {
                        marked[i][j] = marked[i + 1][j] = marked[i + 2][j] = true;
                        crushed = true;
                    }
                }
            }
            if (!crushed) {
                return board;
            }
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    if (marked[i][j]) {
                        board[i][j] = 0;
                    }
                }
            }
            // Gravity: each column compacts downward in place — candies
            // fall past the holes, holes bubble to the top.
            for (int j = 0; j < cols; j++) {
                int write = rows - 1;
                for (int i = rows - 1; i >= 0; i--) {
                    if (board[i][j] != 0) {
                        board[write][j] = board[i][j];
                        write--;
                    }
                }
                for (int i = write; i >= 0; i--) {
                    board[i][j] = 0;
                }
            }
        }
    }
}
