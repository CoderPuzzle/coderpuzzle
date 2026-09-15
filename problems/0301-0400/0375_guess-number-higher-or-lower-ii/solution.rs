impl Solution {
    pub fn get_money_amount(n: i32) -> i32 {
        let n = n as usize;
        // dp[i][j] = min money that guarantees finding any number in
        // [i, j]; padded to n+2 so the empty-side reads dp[i][guess-1]
        // and dp[guess+1][j] stay valid (and 0).
        let size = n + 2;
        let mut dp = vec![vec![0i32; size]; size];
        // Fill by interval length: a range's value depends only on its
        // strictly shorter subranges. Length 1 is free (single candidate).
        for length in 2..=n {
            for i in 1..=(n + 1 - length) {
                let j = i + length - 1;
                let mut best = i32::MAX;
                // Minimax: the opponent may hide in the worse side, so
                // guessing g costs g + max(dp of the two remaining sides).
                for guess in i..=j {
                    let lower = dp[i][guess - 1];
                    let upper = dp[guess + 1][j];
                    let cost = guess as i32 + lower.max(upper);
                    if cost < best {
                        best = cost;
                    }
                }
                dp[i][j] = best;
            }
        }
        dp[1][n]
    }
}
