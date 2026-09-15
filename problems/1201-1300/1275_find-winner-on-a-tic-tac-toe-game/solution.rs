impl Solution {
    pub fn tictactoe(moves: Vec<Vec<i32>>) -> String {
        // Tally each player's occupancy per row and column as moves land,
        // diagonals directly (+1 for A, -1 for B); a tally reaching +-3 is
        // a completed line. In a valid transcript the game stops at the
        // first completed line, so the mover who completes one wins on the
        // spot and later moves cannot exist.
        let mut rows = [0i32; 3];
        let mut cols = [0i32; 3];
        let (mut diag, mut anti) = (0i32, 0i32);
        for (i, mv) in moves.iter().enumerate() {
            let (r, c) = (mv[0] as usize, mv[1] as usize);
            let step: i32 = if i % 2 == 0 { 1 } else { -1 };
            rows[r] += step;
            cols[c] += step;
            if r == c {
                diag += step;
            }
            if r + c == 2 {
                anti += step;
            }
            let reach = rows[r].abs().max(cols[c].abs()).max(diag.abs()).max(anti.abs());
            if reach == 3 {
                return if step == 1 { "A" } else { "B" }.to_string();
            }
        }
        if moves.len() == 9 {
            "Draw".to_string()
        } else {
            "Pending".to_string()
        }
    }
}
