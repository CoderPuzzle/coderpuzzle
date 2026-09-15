impl Solution {
    pub fn max_palindromes(s: String, k: i32) -> i32 {
        // For each end index r, best[r] is the largest start l of a
        // palindrome s[l..r] with length at least k. Among all palindromes
        // ending at r, the one starting latest leaves the most room on the
        // left and reaches the biggest dp[l], since dp never decreases.
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut best = vec![-1i32; n];
        for center in 0..n {
            let (mut l, mut r) = (center as i32, center as i32);
            while l >= 0 && r < n as i32 && bytes[l as usize] == bytes[r as usize] {
                if r - l + 1 >= k && l > best[r as usize] {
                    best[r as usize] = l;
                }
                l -= 1;
                r += 1;
            }
        }
        for center in 0..n.saturating_sub(1) {
            let (mut l, mut r) = (center as i32, center as i32 + 1);
            while l >= 0 && r < n as i32 && bytes[l as usize] == bytes[r as usize] {
                if r - l + 1 >= k && l > best[r as usize] {
                    best[r as usize] = l;
                }
                l -= 1;
                r += 1;
            }
        }
        // dp[i] = answer for the prefix s[0..i-1]; either skip index i-1 or
        // take the latest-starting palindrome that ends there.
        let mut dp = vec![0i32; n + 1];
        for r in 0..n {
            dp[r + 1] = dp[r];
            let l = best[r];
            if l != -1 && dp[l as usize] + 1 > dp[r + 1] {
                dp[r + 1] = dp[l as usize] + 1;
            }
        }
        dp[n]
    }
}
