impl Solution {
    pub fn check_move(board: Vec<Vec<String>>, r_move: i32, c_move: i32, color: String) -> bool {
        // Walk the eight directions from the move cell: a legal move needs a
        // run of the opposite color ending in a cell of the move's color.
        let target = color.as_bytes()[0];
        let opposite = if target == b'B' { b'W' } else { b'B' };
        let dr = [-1, -1, -1, 0, 0, 1, 1, 1];
        let dc = [-1, 0, 1, -1, 1, -1, 0, 1];
        let in_board = |r: i32, c: i32| r >= 0 && r < 8 && c >= 0 && c < 8;
        for d in 0..8 {
            let mut r = r_move + dr[d];
            let mut c = c_move + dc[d];
            if !in_board(r, c) || board[r as usize][c as usize].as_bytes()[0] != opposite {
                continue;
            }
            r += dr[d];
            c += dc[d];
            while in_board(r, c) && board[r as usize][c as usize].as_bytes()[0] == opposite {
                r += dr[d];
                c += dc[d];
            }
            if in_board(r, c) && board[r as usize][c as usize].as_bytes()[0] == target {
                return true;
            }
        }
        false
    }
}
