impl Solution {
    pub fn max_points(points: Vec<Vec<i32>>) -> i64 {
        let m = points.len();
        let n = points[0].len();
        // dp[c] = best score with the current row's pick at column c; the
        // first row seeds it with its own point values.
        let mut prev: Vec<i64> = (0..n).map(|c| points[0][c] as i64).collect();
        let mut left = vec![0i64; n];
        let mut right = vec![0i64; n];
        for r in 1..m {
            // Split |p - c| by direction: from the left the carry-over is
            // dp[p] + p - c, so a running max of dp[p] + p replaces the
            // quadratic predecessor rescan.
            let mut best = prev[0] + 0;
            for c in 0..n {
                if prev[c] + c as i64 > best {
                    best = prev[c] + c as i64;
                }
                left[c] = best;
            }
            // Mirror sweep from the right: running max of dp[p] - p, p >= c.
            best = prev[n - 1] - (n as i64 - 1);
            for c in (0..n).rev() {
                if prev[c] - c as i64 > best {
                    best = prev[c] - c as i64;
                }
                right[c] = best;
            }
            // Both directions cover p == c (zero penalty), so every
            // predecessor is considered under the correct penalty sign.
            for c in 0..n {
                let l = left[c] - c as i64;
                let rr = right[c] + c as i64;
                let b = if l > rr { l } else { rr };
                prev[c] = points[r][c] as i64 + b;
            }
        }
        let mut ans = prev[0];
        for c in 1..n {
            if prev[c] > ans {
                ans = prev[c];
            }
        }
        ans
    }
}
