impl Solution {
    pub fn winner_square_game(n: i32) -> bool {
        // wins[i] is true exactly when the player to move, facing a pile of
        // i stones, can force a win with optimal play from both sides.
        let n = n as usize;
        let mut wins = vec![false; n + 1];
        for total in 1..=n {
            let mut k = 1usize;
            while k * k <= total {
                // Removing k*k stones hands the opponent a pile of size
                // total - k*k. If that leaves the opponent in a losing
                // state, the mover wins by making this exact move.
                if !wins[total - k * k] {
                    wins[total] = true;
                    break;
                }
                k += 1;
            }
        }
        wins[n]
    }
}
