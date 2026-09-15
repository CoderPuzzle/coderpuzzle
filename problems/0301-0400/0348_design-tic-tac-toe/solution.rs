// One counter per line: rows/cols carry each player's mark count on every
// line, plus one counter per diagonal — a counter reaching n means the
// player owns the whole line, so no board is stored.
pub struct TicTacToe {
    n: i32,
    rows: Vec<Vec<i32>>,
    cols: Vec<Vec<i32>>,
    diagonal: Vec<i32>,
    anti_diagonal: Vec<i32>,
}

impl TicTacToe {
    pub fn new(n: i32) -> Self {
        // Index 0 stays unused so the player ids 1 and 2 address their
        // own counter rows directly.
        TicTacToe {
            n,
            rows: vec![vec![0; n as usize]; 3],
            cols: vec![vec![0; n as usize]; 3],
            diagonal: vec![0; 3],
            anti_diagonal: vec![0; 3],
        }
    }

    pub fn make_move(&mut self, row: i32, col: i32, player: i32) -> i32 {
        // Only the lines through the played square can complete on this
        // move, so the counters just bumped decide the winner.
        let p = player as usize;
        self.rows[p][row as usize] += 1;
        self.cols[p][col as usize] += 1;
        if row == col {
            self.diagonal[p] += 1;
        }
        if row + col == self.n - 1 {
            self.anti_diagonal[p] += 1;
        }
        if self.rows[p][row as usize] == self.n
            || self.cols[p][col as usize] == self.n
            || self.diagonal[p] == self.n
            || self.anti_diagonal[p] == self.n
        {
            return player;
        }
        0
    }
}
