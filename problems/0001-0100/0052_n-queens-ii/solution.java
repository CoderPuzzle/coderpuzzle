class Solution {

    public int totalNQueens(int n) {
        // One queen per row means rows can never clash; marks for the column
        // and the two diagonal families make "attacked?" a constant-time check.
        boolean[] columns = new boolean[n];
        boolean[] diagonals = new boolean[2 * n - 1];
        boolean[] antiDiagonals = new boolean[2 * n - 1];
        return walk(0, n, columns, diagonals, antiDiagonals);
    }

    // Every row has a queen: one complete, conflict-free placement.
    private int walk(int row, int n, boolean[] columns, boolean[] diagonals, boolean[] antiDiagonals) {
        if (row == n) return 1;
        int count = 0;
        for (int column = 0; column < n; ++column) {
            // r - c is constant along a main diagonal (shifted up by n - 1 to
            // stay a valid index), r + c along an anti-diagonal.
            int diagonal = row + n - 1 - column;
            int antiDiagonal = row + column;
            if (columns[column] || diagonals[diagonal] || antiDiagonals[antiDiagonal]) continue;
            columns[column] = true;
            diagonals[diagonal] = true;
            antiDiagonals[antiDiagonal] = true;
            count += walk(row + 1, n, columns, diagonals, antiDiagonals);
            // Undo the marks so sibling branches start from the same board.
            columns[column] = false;
            diagonals[diagonal] = false;
            antiDiagonals[antiDiagonal] = false;
        }
        return count;
    }
}
