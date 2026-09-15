impl Solution {
    pub fn score_balance(s: String) -> bool {
        // The total letter score lets every split compare a running prefix
        // against the remainder: the halves balance exactly when the running
        // score reaches half the total.
        let total: i32 = s.bytes().map(|b| (b - b'a') as i32 + 1).sum();
        let bytes = s.as_bytes();
        let mut left = 0;
        // Sweep the split points, growing the left side one letter at a time;
        // stopping before the final character keeps both halves non-empty.
        for i in 0..bytes.len() - 1 {
            left += (bytes[i] - b'a') as i32 + 1;
            if 2 * left == total {
                return true;
            }
        }
        false
    }
}
