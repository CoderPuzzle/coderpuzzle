impl Solution {
    pub fn min_cost(n: i32, cuts: Vec<i32>) -> i32 {
        let mut positions = cuts.clone();
        positions.push(0);
        positions.push(n);
        // Sorting matters: the cutting order is free while the input order
        // is not, and the sentinel endpoints make the outermost segments
        // uniform.
        positions.sort_unstable();
        let size = positions.len();
        // dp[i][j]: minimum cost of all cuts strictly between boundaries i
        // and j; adjacent boundaries (no interior cut) stay 0.
        let mut dp = vec![vec![0i64; size]; size];
        // Fill by increasing segment length so both subproblems of an
        // interval are already solved when it needs them.
        for length in 2..size {
            for i in 0..(size - length) {
                let j = i + length;
                let mut best = i64::MAX;
                // Try every interior boundary as the first cut: it splits
                // the segment into independent subproblems and costs the
                // segment's full length.
                for k in (i + 1)..j {
                    if dp[i][k] + dp[k][j] < best {
                        best = dp[i][k] + dp[k][j];
                    }
                }
                dp[i][j] = best + (positions[j] - positions[i]) as i64;
            }
        }
        dp[0][size - 1] as i32
    }
}
