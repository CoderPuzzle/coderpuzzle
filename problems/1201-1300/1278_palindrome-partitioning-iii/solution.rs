impl Solution {
    pub fn palindrome_partition(s: String, k: i32) -> i32 {
        let b = s.as_bytes();
        let n = b.len();
        let k = k as usize;
        // cost[i][j] = min changes to make s[i..j] a palindrome
        let mut cost = vec![vec![0usize; n]; n];
        for len in 2..=n {
            for i in 0..=(n - len) {
                let j = i + len - 1;
                let mismatch = if b[i] == b[j] { 0 } else { 1 };
                // each mismatched outer pair costs one change; the
                // interior cost is already known (lengths grow)
                cost[i][j] = cost[i + 1][j - 1] + mismatch;
            }
        }
        // dp[c][i] = min changes to split prefix of length i into c parts
        let inf = n / 2 + 1; // any interval costs at most n / 2
        let mut dp = vec![vec![inf; n + 1]; k + 1];
        for i in 1..=n {
            dp[1][i] = cost[0][i - 1];
        }
        for c in 2..=k {
            // i starts at c: c non-empty parts need at least c characters
            for i in c..=n {
                let mut best = inf;
                // the last part is s[j..i-1] — try every left boundary
                for j in (c - 1)..i {
                    let cand = dp[c - 1][j] + cost[j][i - 1];
                    if cand < best {
                        best = cand;
                    }
                }
                dp[c][i] = best;
            }
        }
        dp[k][n] as i32
    }
}
