use std::collections::HashMap;

impl Solution {
    pub fn find_pattern(board: Vec<Vec<i32>>, pattern: Vec<String>) -> Vec<i32> {
        // Corners are scanned row-major, so the first hit already
        // carries the lowest row and then the lowest column. Each
        // candidate is validated by one pass that grows a
        // letter->digit bijection: a letter must repeat its own
        // digit, and a digit already claimed by one letter is
        // refused for every other letter.
        let rows = board.len();
        let cols = board[0].len();
        let p_rows = pattern.len();
        let p_cols = pattern[0].len();
        // saturating bounds keep the loops empty when the pattern does
        // not fit the board at all.
        for r in 0..(rows + 1).saturating_sub(p_rows) {
            for c in 0..(cols + 1).saturating_sub(p_cols) {
                if matches(&board, &pattern, r, c) {
                    return vec![r as i32, c as i32];
                }
            }
        }
        vec![-1, -1]
    }
}

fn matches(board: &[Vec<i32>], pattern: &[String], r: usize, c: usize) -> bool {
    let mut to_digit: HashMap<u8, i32> = HashMap::new();
    let mut to_letter: HashMap<i32, u8> = HashMap::new();
    for (i, row) in pattern.iter().enumerate() {
        for (j, &ch) in row.as_bytes().iter().enumerate() {
            let value = board[r + i][c + j];
            if ch.is_ascii_digit() {
                if value != (ch - b'0') as i32 {
                    return false;
                }
            } else if let Some(&digit) = to_digit.get(&ch) {
                if digit != value {
                    return false;
                }
            } else if to_letter.contains_key(&value) {
                return false;
            } else {
                to_digit.insert(ch, value);
                to_letter.insert(value, ch);
            }
        }
    }
    true
}
