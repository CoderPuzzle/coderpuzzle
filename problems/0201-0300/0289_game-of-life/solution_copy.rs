impl Solution {
    pub fn game_of_life(mut board: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = board.len();
        let n = board[0].len();
        // Snapshot the current generation: every neighbor count must read
        // the old states even while the board itself is being overwritten.
        let snapshot = board.clone();
        let dirs = [
            (-1i32, -1i32),
            (-1, 0),
            (-1, 1),
            (0, -1),
            (0, 1),
            (1, -1),
            (1, 0),
            (1, 1),
        ];
        for r in 0..m {
            for c in 0..n {
                let mut live = 0;
                // Count live neighbors in the snapshot; cells outside the
                // board count as dead via the bounds check.
                for (dr, dc) in dirs {
                    let nr = r as i32 + dr;
                    let nc = c as i32 + dc;
                    if nr >= 0 && (nr as usize) < m && nc >= 0 && (nc as usize) < n {
                        if snapshot[nr as usize][nc as usize] == 1 {
                            live += 1;
                        }
                    }
                }
                // Rules applied to the old state: live survives on 2 or 3,
                // dead is born on exactly 3, everything else dies/stays
                // dead.
                if snapshot[r][c] == 1 {
                    board[r][c] = if live == 2 || live == 3 { 1 } else { 0 };
                } else {
                    board[r][c] = if live == 3 { 1 } else { 0 };
                }
            }
        }
        board
    }
}
