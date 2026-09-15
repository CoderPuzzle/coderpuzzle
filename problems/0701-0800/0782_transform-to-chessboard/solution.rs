impl Solution {
    // Row and column swaps preserve the XOR of any rectangle's four corners,
    // and that XOR is 0 on every chessboard, so a solvable board must repeat
    // one row (or its complement) everywhere.
    pub fn moves_to_chessboard(board: Vec<Vec<i32>>) -> i32 {
        let n = board.len() as i32;
        for i in 0..n as usize {
            for j in 0..n as usize {
                if board[0][0] ^ board[0][j] ^ board[i][0] ^ board[i][j] != 0 {
                    return -1;
                }
            }
        }
        // The first row and first column must each be rearrangeable into an
        // alternating pattern, so both need n/2 (or (n+1)/2) ones.
        let half = n / 2;
        let ceil_half = (n + 1) / 2;
        let row_ones: i32 = board[0].iter().sum();
        let col_ones: i32 = (0..n as usize).map(|i| board[i][0]).sum();
        let fits = |ones: i32| ones == half || ones == ceil_half;
        if !fits(row_ones) || !fits(col_ones) {
            return -1;
        }
        // Count rows/columns already sitting where the pattern starting
        // with 0 wants them; each swap corrects two misplaced ones.
        let row_matches = (0..n as usize).filter(|&i| board[i][0] == (i % 2) as i32).count() as i32;
        let col_matches = (0..n as usize).filter(|&i| board[0][i] == (i % 2) as i32).count() as i32;
        let (row_swaps, col_swaps) = if n % 2 == 0 {
            // Both alternating patterns are available; either way to pair
            // the misplaced entries is fair game, so take the cheaper.
            (row_matches.min(n - row_matches), col_matches.min(n - col_matches))
        } else {
            // Odd n pins the pattern by its majority value, and the true
            // mismatch count is the even member of each pair.
            (
                if row_matches % 2 == 0 {
                    row_matches
                } else {
                    n - row_matches
                },
                if col_matches % 2 == 0 {
                    col_matches
                } else {
                    n - col_matches
                },
            )
        };
        (row_swaps + col_swaps) / 2
    }
}
