impl Solution {
    pub fn place_word_in_crossword(board: Vec<Vec<String>>, word: String) -> bool {
        fn matches(
            board: &[Vec<String>],
            word: &[u8],
            row: usize,
            column: usize,
            row_step: usize,
            column_step: usize,
            length: usize,
        ) -> bool {
            if length != word.len() {
                return false;
            }
            let mut forward = true;
            let mut backward = true;
            for offset in 0..length {
                let cell = board[row + row_step * offset][column + column_step * offset].as_bytes()[0];
                if cell != b' ' {
                    forward &= cell == word[offset];
                    backward &= cell == word[length - 1 - offset];
                }
            }
            forward || backward
        }

        let rows = board.len();
        let columns = board[0].len();
        let word = word.as_bytes();

        for row in 0..rows {
            let mut start = 0;
            for end in 0..=columns {
                if end == columns || board[row][end] == "#" {
                    if matches(&board, word, row, start, 0, 1, end - start) {
                        return true;
                    }
                    start = end + 1;
                }
            }
        }

        for column in 0..columns {
            let mut start = 0;
            for end in 0..=rows {
                if end == rows || board[end][column] == "#" {
                    if matches(&board, word, start, column, 1, 0, end - start) {
                        return true;
                    }
                    start = end + 1;
                }
            }
        }

        false
    }
}
