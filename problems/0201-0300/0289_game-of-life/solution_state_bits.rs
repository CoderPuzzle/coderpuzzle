impl Solution {
    pub fn game_of_life(mut board: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = board.len();
        let n = board[0].len();
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
                for (dr, dc) in dirs {
                    let nr = r as i32 + dr;
                    let nc = c as i32 + dc;
                    if nr >= 0 && (nr as usize) < m && nc >= 0 && (nc as usize) < n {
                        let v = board[nr as usize][nc as usize];
                        if v == 1 || v == 2 {
                            live += 1;
                        }
                    }
                }
                if board[r][c] == 1 && (live < 2 || live > 3) {
                    board[r][c] = 2; // live -> dead
                } else if board[r][c] == 0 && live == 3 {
                    board[r][c] = 3; // dead -> live
                }
            }
        }
        for r in 0..m {
            for c in 0..n {
                board[r][c] = if board[r][c] == 1 || board[r][c] == 3 { 1 } else { 0 };
            }
        }
        board
    }
}
