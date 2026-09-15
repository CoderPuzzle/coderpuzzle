class Solution {
  public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> results;
        vector<int> cols, diag1, diag2;
        vector<string> board;

        backtrack(0, n, cols, diag1, diag2, board, results);
        return results;
    }

  private:
    void backtrack(int row, int n, vector<int> &cols, vector<int> &diag1, vector<int> &diag2, vector<string> &board,
                   vector<vector<string>> &results) {
        // One queen per row removes row conflicts by construction, so only
        // columns and diagonals need tracking while the board grows row by row.
        // Every row holds a queen and no pair attacks here; push_back copies
        // the board so later backtracking cannot mutate this solution.
        if (row == n) {
            results.push_back(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            // Safety check via the three conflict lists: cols holds occupied
            // columns, diag1 holds row - col (constant along one diagonal
            // family), diag2 holds row + col (the other family). A candidate
            // is safe exactly when all three values are unseen (the linear
            // contains scan makes this O(n) where a hash set would be O(1)).
            if (contains(cols, col) || contains(diag1, row - col) || contains(diag2, row + col)) {
                continue;
            }
            cols.push_back(col);
            diag1.push_back(row - col);
            diag2.push_back(row + col);
            board.push_back(string(col, '.') + "Q" + string(n - col - 1, '.'));
            backtrack(row + 1, n, cols, diag1, diag2, board, results);
            // Undo the placement, restoring state for the next candidate.
            board.pop_back();
            cols.pop_back();
            diag1.pop_back();
            diag2.pop_back();
        }
    }

    static bool contains(vector<int> &v, int x) {
        for (int y : v) {
            if (y == x)
                return true;
        }
        return false;
    }
};
