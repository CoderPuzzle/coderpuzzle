impl Solution {
    pub fn candy_crush(mut board: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // One round: flag every candy inside a horizontal or vertical run
        // of three or more equal values, empty the flagged cells, then let
        // gravity settle every column. Both sweeps read the untouched
        // board, so the flags land simultaneously — an L or T of one candy
        // type loses all of its cells in a single round. Repeat until a
        // round flags nothing; that board is stable.
        let rows = board.len();
        let cols = board[0].len();
        loop {
            let mut marked = vec![vec![false; cols]; rows];
            let mut crushed = false;
            for i in 0..rows {
                for j in 0..cols - 2 {
                    let value = board[i][j];
                    if value != 0 && value == board[i][j + 1] && value == board[i][j + 2] {
                        marked[i][j] = true;
                        marked[i][j + 1] = true;
                        marked[i][j + 2] = true;
                        crushed = true;
                    }
                }
            }
            for j in 0..cols {
                for i in 0..rows - 2 {
                    let value = board[i][j];
                    if value != 0 && value == board[i + 1][j] && value == board[i + 2][j] {
                        marked[i][j] = true;
                        marked[i + 1][j] = true;
                        marked[i + 2][j] = true;
                        crushed = true;
                    }
                }
            }
            if !crushed {
                return board;
            }
            for i in 0..rows {
                for j in 0..cols {
                    if marked[i][j] {
                        board[i][j] = 0;
                    }
                }
            }
            // Gravity: each column compacts downward in place — candies
            // fall past the holes, holes bubble to the top. `write` counts
            // down from `rows` and steps before it stores, so a column
            // that stayed full never drives it below zero.
            for j in 0..cols {
                let mut write = rows;
                for i in (0..rows).rev() {
                    if board[i][j] != 0 {
                        write -= 1;
                        board[write][j] = board[i][j];
                    }
                }
                for i in 0..write {
                    board[i][j] = 0;
                }
            }
        }
    }
}
