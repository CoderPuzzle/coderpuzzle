impl Solution {
    pub fn count_substrings(s: String, t: String) -> i32 {
        // same[j] = length of the exact-match run ending at s[i-1], t[j-1].
        // diff[j] = length of the run ending there with exactly one
        // mismatch, counted directly: the mismatch count along a fixed pair
        // of starts is monotone non-decreasing, so this length is exact.
        let s: Vec<u8> = s.into_bytes();
        let t: Vec<u8> = t.into_bytes();
        let n = s.len();
        let m = t.len();
        let mut same_prev = vec![0i64; m + 1];
        let mut diff_prev = vec![0i64; m + 1];
        let mut total: i64 = 0;
        for i in 1..=n {
            let mut same_curr = vec![0i64; m + 1];
            let mut diff_curr = vec![0i64; m + 1];
            for j in 1..=m {
                if s[i - 1] == t[j - 1] {
                    // A matching pair of last characters carries the
                    // diagonal counts forward unchanged.
                    same_curr[j] = same_prev[j - 1] + 1;
                    diff_curr[j] = diff_prev[j - 1];
                } else {
                    // This position is the single mismatch, so it can only
                    // extend back through a run that matched perfectly.
                    same_curr[j] = 0;
                    diff_curr[j] = same_prev[j - 1] + 1;
                }
                total += diff_curr[j];
            }
            same_prev = same_curr;
            diff_prev = diff_curr;
        }
        total as i32
    }
}
