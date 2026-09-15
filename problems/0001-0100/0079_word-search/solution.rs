impl Solution {
    pub fn exist(mut board: Vec<Vec<String>>, word: String) -> bool {
        let word = word.as_bytes();
        for row in 0..board.len() {
            for col in 0..board[0].len() {
                if walk(&mut board, word, row, col, 0) {
                    return true;
                }
            }
        }
        false
    }
}

// Depth-first walk from one starting cell: every level must supply the next
// letter and marks its cell so deeper levels cannot step on it twice.
fn walk(board: &mut [Vec<String>], word: &[u8], row: usize, col: usize, index: usize) -> bool {
    // The cell must supply this letter; the last letter completes the word.
    if board[row][col].as_bytes()[0] != word[index] {
        return false;
    }
    if index == word.len() - 1 {
        return true;
    }
    // The board doubles as the visited set: overwrite the cell with a marker
    // no letter can equal, so deeper levels cannot step on it.
    let letter = board[row][col].clone();
    board[row][col] = "#".to_string();
    let mut found = false;
    for (delta_row, delta_col) in [(0i64, -1i64), (0, 1), (-1, 0), (1, 0)] {
        let next_row = row as i64 + delta_row;
        let next_col = col as i64 + delta_col;
        let inside =
            0 <= next_row && next_row < board.len() as i64 && 0 <= next_col && next_col < board[0].len() as i64;
        if inside && walk(board, word, next_row as usize, next_col as usize, index + 1) {
            found = true;
            break;
        }
    }
    // Restore on the way out: sibling starts and later cases see the board intact.
    board[row][col] = letter;
    found
}
