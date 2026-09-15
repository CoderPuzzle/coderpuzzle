class Solution {
  public:
    int totalNQueens(int n) {
        // One queen per row means rows can never clash; marks for the column
        // and the two diagonal families make "attacked?" a constant-time check.
        vector<bool> columns(n, false);
        vector<bool> diagonals(2 * n - 1, false);
        vector<bool> antiDiagonals(2 * n - 1, false);
        return walk(0, n, columns, diagonals, antiDiagonals);
    }

  private:
    // Every row has a queen: one complete, conflict-free placement.
    int walk(int row, int n, vector<bool> &columns, vector<bool> &diagonals, vector<bool> &antiDiagonals) {
        if (row == n)
            return 1;
        int count = 0;
        for (int column = 0; column < n; ++column) {
            // r - c is constant along a main diagonal (shifted up by n - 1 to
            // stay a valid index), r + c along an anti-diagonal.
            int diagonal = row + n - 1 - column;
            int antiDiagonal = row + column;
            if (columns[column] || diagonals[diagonal] || antiDiagonals[antiDiagonal])
                continue;
            columns[column] = diagonals[diagonal] = antiDiagonals[antiDiagonal] = true;
            count += walk(row + 1, n, columns, diagonals, antiDiagonals);
            // Undo the marks so sibling branches start from the same board.
            columns[column] = diagonals[diagonal] = antiDiagonals[antiDiagonal] = false;
        }
        return count;
    }
};
