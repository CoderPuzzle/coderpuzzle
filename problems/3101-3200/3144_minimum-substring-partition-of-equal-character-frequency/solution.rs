impl Solution {
    pub fn minimum_substrings_in_partition(s: String) -> i32 {
        // dp[i] = fewest balanced pieces covering the first i characters.
        // Extending a candidate start leftwards one letter at a time keeps
        // its counts in an array while tracking how many letters are live
        // and the largest count seen; the window is balanced exactly when
        // live * largest equals its length, which makes each dp[i] one
        // backwards sweep away.
        let bytes = s.as_bytes();
        let n = bytes.len();
        const INF: i32 = i32::MAX;
        let mut dp = vec![INF; n + 1];
        dp[0] = 0;
        for i in 1..=n {
            let mut counts = [0i32; 26];
            let mut live = 0usize;
            let mut top = 0;
            for right in (0..i).rev() {
                let b = (bytes[right] - b'a') as usize;
                if counts[b] == 0 {
                    live += 1;
                }
                counts[b] += 1;
                if counts[b] > top {
                    top = counts[b];
                }
                if live as i32 * top == (i - right) as i32 && dp[right] + 1 < dp[i] {
                    dp[i] = dp[right] + 1;
                }
            }
        }
        dp[n]
    }
}
