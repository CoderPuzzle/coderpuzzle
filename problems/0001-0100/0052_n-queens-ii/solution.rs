impl Solution {
    pub fn total_n_queens(n: i32) -> i32 {
        // One queen per row means rows can never clash; marks for the column
        // and the two diagonal families make "attacked?" a constant-time check.
        let n = n as usize;
        let mut columns = vec![false; n];
        let mut diagonals = vec![false; 2 * n - 1];
        let mut anti_diagonals = vec![false; 2 * n - 1];
        walk(0, n, &mut columns, &mut diagonals, &mut anti_diagonals) as i32
    }
}

// Every row has a queen: one complete, conflict-free placement.
fn walk(row: usize, n: usize, columns: &mut [bool], diagonals: &mut [bool], anti_diagonals: &mut [bool]) -> usize {
    if row == n {
        return 1;
    }
    let mut count = 0;
    for column in 0..n {
        // r - c is constant along a main diagonal (written as row + n - 1 -
        // column so the usize subtraction cannot underflow), r + c along an
        // anti-diagonal.
        let diagonal = row + n - 1 - column;
        let anti_diagonal = row + column;
        if columns[column] || diagonals[diagonal] || anti_diagonals[anti_diagonal] {
            continue;
        }
        columns[column] = true;
        diagonals[diagonal] = true;
        anti_diagonals[anti_diagonal] = true;
        count += walk(row + 1, n, columns, diagonals, anti_diagonals);
        // Undo the marks so sibling branches start from the same board.
        columns[column] = false;
        diagonals[diagonal] = false;
        anti_diagonals[anti_diagonal] = false;
    }
    count
}
