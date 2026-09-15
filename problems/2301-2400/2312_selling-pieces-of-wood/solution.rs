impl Solution {
    pub fn selling_wood(m: i32, n: i32, prices: Vec<Vec<i32>>) -> i64 {
        let m = m as usize;
        let n = n as usize;
        // Dense price table: 0 where a shape is unsold, max on duplicates.
        let mut price = vec![vec![0i64; n + 1]; m + 1];
        for p in &prices {
            let (h, w, v) = (p[0] as usize, p[1] as usize, p[2] as i64);
            if price[h][w] < v {
                price[h][w] = v;
            }
        }
        // dp[i][j] = best revenue from an i x j piece: sell whole, or one
        // horizontal / vertical first cut with both halves solved
        // independently. Increasing i then j keeps every subproblem ready.
        let mut dp = vec![vec![0i64; n + 1]; m + 1];
        for i in 1..=m {
            for j in 1..=n {
                // Selling whole is the default a cut must beat.
                let mut best = price[i][j];
                let row = &dp[i];
                // Horizontal cuts: only up to the midpoint — the symmetric
                // i-h split need not be retried. Earlier rows are final.
                for h in 1..=(i / 2) {
                    let v = dp[h][j] + dp[i - h][j];
                    if v > best {
                        best = v;
                    }
                }
                // Vertical cuts: earlier columns of the current row.
                for w in 1..=(j / 2) {
                    let v = row[w] + row[j - w];
                    if v > best {
                        best = v;
                    }
                }
                dp[i][j] = best;
            }
        }
        dp[m][n]
    }
}
