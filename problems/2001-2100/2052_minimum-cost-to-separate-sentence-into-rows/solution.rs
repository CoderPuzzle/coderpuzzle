impl Solution {
    pub fn minimum_cost(sentence: String, k: i32) -> i32 {
        let lengths: Vec<i64> = sentence.split(' ').map(|word| word.len() as i64).collect();
        let count = lengths.len();
        let k = i64::from(k);
        let mut dp = vec![0_i64; count + 1];

        for start in (0..count).rev() {
            let mut best = i64::MAX;
            let mut row_length = 0_i64;
            for end in start..count {
                row_length += lengths[end] + if end > start { 1 } else { 0 };
                if row_length > k {
                    break;
                }
                let candidate = if end == count - 1 {
                    0
                } else {
                    let unused = k - row_length;
                    unused * unused + dp[end + 1]
                };
                best = best.min(candidate);
            }
            dp[start] = best;
        }
        dp[0] as i32
    }
}
