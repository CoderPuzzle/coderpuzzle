import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public String[][] solveNQueens(int n) {
        List<List<String>> results = new ArrayList<>();
        Set<Integer> cols = new HashSet<>();
        Set<Integer> diag1 = new HashSet<>();
        Set<Integer> diag2 = new HashSet<>();
        List<String> board = new ArrayList<>();

        backtrack(0, n, cols, diag1, diag2, board, results);

        String[][] out = new String[results.size()][];
        for (int i = 0; i < results.size(); i++) {
            List<String> sol = results.get(i);
            out[i] = sol.toArray(new String[0]);
        }
        return out;
    }

    private void backtrack(
        int row,
        int n,
        Set<Integer> cols,
        Set<Integer> diag1,
        Set<Integer> diag2,
        List<String> board,
        List<List<String>> results
    ) {
        // One queen per row removes row conflicts by construction, so only
        // columns and diagonals need tracking while the board grows row by row.
        // Every row holds a queen and no pair attacks here: record a copy so
        // later backtracking cannot mutate this solution.
        if (row == n) {
            results.add(new ArrayList<>(board));
            return;
        }
        for (int col = 0; col < n; col++) {
            // O(1) safety check: cols holds occupied columns, diag1 holds
            // row - col (constant along one diagonal family), diag2 holds
            // row + col (constant along the other). A candidate is safe
            // exactly when all three values are unseen.
            if (cols.contains(col) || diag1.contains(row - col) || diag2.contains(row + col)) {
                continue;
            }
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            StringBuilder sb = new StringBuilder();
            for (int k = 0; k < col; k++) {
                sb.append('.');
            }
            sb.append('Q');
            for (int k = 0; k < n - col - 1; k++) {
                sb.append('.');
            }
            board.add(sb.toString());
            backtrack(row + 1, n, cols, diag1, diag2, board, results);
            // Undo the placement, restoring state for the next candidate.
            board.remove(board.size() - 1);
            cols.remove(col);
            diag1.remove(row - col);
            diag2.remove(row + col);
        }
    }
}
