impl Solution {
    pub fn count_battleships(board: Vec<Vec<String>>) -> i32 {
        // Battleships are straight horizontal or vertical runs of 'X', and
        // no two ships touch, so each ship has exactly one cell with no 'X'
        // above it and no 'X' to its left: its head, the first of its cells
        // in reading order. Counting heads counts ships.
        let m = board.len();
        let n = board[0].len();
        let mut count = 0;
        for i in 0..m {
            for j in 0..n {
                if board[i][j] != "X" {
                    continue;
                }
                if i > 0 && board[i - 1][j] == "X" {
                    continue;
                }
                if j > 0 && board[i][j - 1] == "X" {
                    continue;
                }
                count += 1;
            }
        }
        count
    }
}
