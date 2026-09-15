impl Solution {
    pub fn num_rook_captures(board: Vec<Vec<String>>) -> i32 {
        let mut rook_row: i32 = -1;
        let mut rook_col: i32 = -1;
        for row in 0..8 {
            for col in 0..8 {
                if board[row][col] == "R" {
                    rook_row = row as i32;
                    rook_col = col as i32;
                }
            }
        }

        let mut captures = 0;
        for (delta_row, delta_col) in [(1i32, 0i32), (-1, 0), (0, 1), (0, -1)] {
            let mut row = rook_row + delta_row;
            let mut col = rook_col + delta_col;
            // Walk while the path is still empty; stop at the first piece or the edge.
            while row >= 0 && row < 8 && col >= 0 && col < 8 && board[row as usize][col as usize] == "." {
                row += delta_row;
                col += delta_col;
            }
            if row >= 0 && row < 8 && col >= 0 && col < 8 && board[row as usize][col as usize] == "p" {
                captures += 1;
            }
        }
        captures
    }
}
