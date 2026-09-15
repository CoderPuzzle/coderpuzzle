use std::collections::HashSet;

impl Solution {
    pub fn solve_n_queens(n: i32) -> Vec<Vec<String>> {
        let n = n as usize;
        let mut results: Vec<Vec<String>> = Vec::new();
        let mut cols: HashSet<usize> = HashSet::new();
        let mut diag1: HashSet<isize> = HashSet::new();
        let mut diag2: HashSet<isize> = HashSet::new();
        let mut board: Vec<String> = Vec::new();

        Solution::backtrack(0, n, &mut cols, &mut diag1, &mut diag2, &mut board, &mut results);
        results
    }

    fn backtrack(
        row: usize,
        n: usize,
        cols: &mut HashSet<usize>,
        diag1: &mut HashSet<isize>,
        diag2: &mut HashSet<isize>,
        board: &mut Vec<String>,
        results: &mut Vec<Vec<String>>,
    ) {
        // One queen per row removes row conflicts by construction, so only
        // columns and diagonals need tracking while the board grows row by row.
        // Every row holds a queen and no pair attacks here: record a clone so
        // later backtracking cannot mutate this solution.
        if row == n {
            results.push(board.clone());
            return;
        }
        for col in 0..n {
            let d1 = row as isize - col as isize;
            let d2 = row as isize + col as isize;
            // O(1) safety check: cols holds occupied columns, diag1 holds
            // row - col (constant along one diagonal family), diag2 holds
            // row + col (constant along the other). A candidate is safe
            // exactly when all three values are unseen.
            if cols.contains(&col) || diag1.contains(&d1) || diag2.contains(&d2) {
                continue;
            }
            cols.insert(col);
            diag1.insert(d1);
            diag2.insert(d2);
            board.push(".".repeat(col) + "Q" + &".".repeat(n - col - 1));
            Solution::backtrack(row + 1, n, cols, diag1, diag2, board, results);
            // Undo the placement, restoring state for the next candidate.
            board.pop();
            cols.remove(&col);
            diag1.remove(&d1);
            diag2.remove(&d2);
        }
    }
}
