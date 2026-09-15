/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    const results = [];
    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();
    const board = [];

    const backtrack = (row) => {
        // One queen per row removes row conflicts by construction, so only
        // columns and diagonals need tracking while the board grows row by
        // row. Every row holds a queen and no pair attacks here: record a
        // copy so later backtracking cannot mutate this solution.
        if (row === n) {
            results.push(board.slice());
            return;
        }
        for (let col = 0; col < n; col++) {
            // O(1) safety check: cols holds occupied columns, diag1 holds
            // row - col (constant along one diagonal family), diag2 holds
            // row + col (constant along the other). A candidate is safe
            // exactly when all three values are unseen.
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            board.push(".".repeat(col) + "Q" + ".".repeat(n - col - 1));
            backtrack(row + 1);
            // Undo the placement, restoring state for the next candidate.
            board.pop();
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    };

    backtrack(0);
    return results;
};
