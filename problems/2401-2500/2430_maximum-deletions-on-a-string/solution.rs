impl Solution {
    pub fn delete_string(s: String) -> i32 {
        // dp[i] = max operations to delete s[i:]; LCP via two rolling rows
        let b = s.as_bytes();
        let n = b.len();
        let mut dp = vec![1i32; n + 1];
        dp[n] = 0; // empty suffix needs no operations
        let mut next_row = vec![0i32; n + 1]; // lcp row for index i+1
        let mut cur = vec![0i32; n + 1];
        for i in (0..n).rev() {
            let si = b[i];
            for j in 0..=n {
                cur[j] = 0;
            }
            for j in (0..n).rev() {
                if si == b[j] {
                    cur[j] = next_row[j + 1] + 1;
                }
            }
            let mut best = 1;
            let max_len = (n - i) / 2;
            for length in 1..=max_len {
                if cur[i + length] >= length as i32 {
                    let cand = 1 + dp[i + length];
                    if cand > best {
                        best = cand;
                    }
                }
            }
            dp[i] = best;
            std::mem::swap(&mut next_row, &mut cur);
        }
        dp[0]
    }
}
