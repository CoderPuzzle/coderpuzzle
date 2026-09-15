impl Solution {
    pub fn solve(mut board: Vec<Vec<String>>) -> Vec<Vec<String>> {
        // Ownership hands over the whole allocation, so the marking sweep
        // rewrites it in place — no second board is ever built.
        let m = board.len();
        let n = board[0].len();
        // Reverse the capture: a region keeps its 'O's exactly when it
        // touches the border, so flood-fill from the border 'O's and stamp
        // each survivor '#', a sentinel neither letter can collide with.
        let mut stack: Vec<(usize, usize)> = Vec::new();
        for i in 0..m {
            for j in [0, n - 1] {
                if board[i][j] == "O" {
                    board[i][j] = "#".to_string();
                    stack.push((i, j));
                }
            }
        }
        for j in 0..n {
            for i in [0, m - 1] {
                if board[i][j] == "O" {
                    board[i][j] = "#".to_string();
                    stack.push((i, j));
                }
            }
        }
        // Explicit stack, not recursion: a safe region can span all 40000
        // cells of a 200 x 200 board, deeper than a call stack allows.
        // wrapping_sub makes usize::MAX the out-of-range value, so one
        // bounds check per neighbor covers all four directions.
        while let Some((i, j)) = stack.pop() {
            for (ni, nj) in [(i.wrapping_sub(1), j), (i + 1, j), (i, j.wrapping_sub(1)), (i, j + 1)] {
                if ni < m && nj < n && board[ni][nj] == "O" {
                    board[ni][nj] = "#".to_string();
                    stack.push((ni, nj));
                }
            }
        }
        // One closing sweep: stamped cells are the border-connected
        // survivors and revert to 'O'; every leftover 'O' is enclosed,
        // which is precisely the captured set, and becomes 'X'.
        for row in board.iter_mut() {
            for cell in row.iter_mut() {
                if *cell == "#" {
                    *cell = "O".to_string();
                } else if *cell == "O" {
                    *cell = "X".to_string();
                }
            }
        }
        board
    }
}
