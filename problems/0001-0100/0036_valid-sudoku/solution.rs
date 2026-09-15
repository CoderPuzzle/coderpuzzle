use std::collections::HashSet;

impl Solution {
    pub fn is_valid_sudoku(board: Vec<Vec<String>>) -> bool {
        // One seen-set per row, column, and 3x3 box: insert each filled
        // cell's digit into the three units it belongs to, and the first
        // repeat anywhere is the answer.
        let mut rows: Vec<HashSet<u8>> = (0..9).map(|_| HashSet::new()).collect();
        let mut columns: Vec<HashSet<u8>> = (0..9).map(|_| HashSet::new()).collect();
        let mut boxes: Vec<HashSet<u8>> = (0..9).map(|_| HashSet::new()).collect();
        for r in 0..9 {
            for c in 0..9 {
                let digit = board[r][c].as_bytes()[0];
                if digit == b'.' {
                    continue;
                }
                // Rows and columns are chunked in threes, so this numbers
                // the 3x3 boxes 0 through 8.
                let b = (r / 3) * 3 + c / 3;
                if rows[r].contains(&digit) || columns[c].contains(&digit) || boxes[b].contains(&digit) {
                    return false;
                }
                rows[r].insert(digit);
                columns[c].insert(digit);
                boxes[b].insert(digit);
            }
        }
        true
    }
}
