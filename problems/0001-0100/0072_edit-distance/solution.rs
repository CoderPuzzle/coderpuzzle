impl Solution {
    pub fn min_distance(word1: String, word2: String) -> i32 {
        let a = word1.as_bytes();
        let b = word2.as_bytes();
        let m = a.len();
        let n = b.len();
        // dp[i][j] = min operations turning the first i chars of word1 into
        // the first j chars of word2. Only the last two table rows are kept,
        // since row i reads only row i-1 and its own left neighbor.
        // Row 0: converting the empty prefix costs j insertions.
        let mut prev: Vec<i32> = (0..=n as i32).collect();
        let mut curr: Vec<i32> = vec![0; n + 1];
        for i in 1..=m {
            // Column 0: converting an i-char prefix to empty costs i deletions.
            curr[0] = i as i32;
            for j in 1..=n {
                if a[i - 1] == b[j - 1] {
                    // Last chars align for free: inherit the diagonal.
                    curr[j] = prev[j - 1];
                } else {
                    // One paid operation must fix the mismatch; each choice
                    // covers a distinct final move, so the min is exact.
                    // Replace inherits prev[j-1], delete drops word1[i-1]
                    // and inherits prev[j], insert appends word2[j-1] and
                    // inherits curr[j-1] (one fewer char of word2 to match).
                    curr[j] = 1 + prev[j - 1].min(prev[j]).min(curr[j - 1]);
                }
            }
            // Roll the rows: curr becomes the new prev.
            std::mem::swap(&mut prev, &mut curr);
        }
        prev[n]
    }
}
