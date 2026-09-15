impl Solution {
    pub fn knight_probability(n: i32, k: i32, row: i32, column: i32) -> f64 {
        // Probability-mass DP over the board. board[r][c] is the probability
        // of standing on (r, c) after the moves made so far; one gather sweep
        // advances it by one move, and mass addressed off the board is lost.
        let n = n as usize;
        let moves = [(-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1)];
        let mut board = vec![vec![0.0; n]; n];
        board[row as usize][column as usize] = 1.0;
        for _ in 0..k {
            let mut next = vec![vec![0.0; n]; n];
            for r in 0..n {
                for c in 0..n {
                    let mut mass = 0.0;
                    for (dr, dc) in moves {
                        let nr = r as i32 + dr;
                        let nc = c as i32 + dc;
                        if nr >= 0 && nr < n as i32 && nc >= 0 && nc < n as i32 {
                            mass += board[nr as usize][nc as usize] / 8.0;
                        }
                    }
                    next[r][c] = mass;
                }
            }
            board = next;
        }
        let mut total = 0.0;
        for r in 0..n {
            for c in 0..n {
                total += board[r][c];
            }
        }
        total
    }
}
