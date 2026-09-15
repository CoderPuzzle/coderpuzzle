import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public String[][] updateBoard(String[][] board, int[] click) {
        // A revealed mine ends the game on the spot: it becomes 'X' and no
        // other cell changes, so return before any flood starts.
        int rows = board.length;
        int cols = board[0].length;
        int r0 = click[0];
        int c0 = click[1];
        if (board[r0][c0].equals("M")) {
            board[r0][c0] = "X";
            return board;
        }
        // Breadth-first reveal from the clicked square, on an explicit queue:
        // a blank region can span every cell of a 50 x 50 board, deeper than
        // recursion would safely go.
        int[][] directions = { { -1, -1 }, { -1, 0 }, { -1, 1 }, { 0, -1 }, { 0, 1 }, { 1, -1 }, { 1, 0 }, { 1, 1 } };
        Deque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] { r0, c0 });
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int r = cell[0];
            int c = cell[1];
            // Two blanks can enqueue the same neighbor; only its first
            // processing reveals it, and this check drops the stale copy.
            if (!board[r][c].equals("E")) {
                continue;
            }
            // An empty square's face is its count of adjacent mines, and
            // that count is exactly what bounds the flood.
            int mines = 0;
            for (int[] d : directions) {
                int nr = r + d[0];
                int nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].equals("M")) {
                    mines++;
                }
            }
            if (mines > 0) {
                // Digits are the frontier of the flood: they stop it.
                board[r][c] = String.valueOf(mines);
                continue;
            }
            board[r][c] = "B";
            for (int[] d : directions) {
                int nr = r + d[0];
                int nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].equals("E")) {
                    queue.add(new int[] { nr, nc });
                }
            }
        }
        // The reveal happened inside the input allocation; the same board,
        // now revealed, is what the judge compares.
        return board;
    }
}
