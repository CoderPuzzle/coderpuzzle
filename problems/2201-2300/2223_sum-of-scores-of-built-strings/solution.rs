impl Solution {
    pub fn sum_scores(s: String) -> i64 {
        let s = s.as_bytes();
        let n = s.len();
        if n == 0 {
            return 0;
        }
        let mut z = vec![0i64; n];
        // s_n = s is its own longest prefix; each s_i is a suffix scoring z[n - i]
        z[0] = n as i64;
        let mut left = 0usize;
        let mut right = 0usize;
        for i in 1..n {
            if i < right {
                // inside the window [left, right): reuse the mirrored z[i - left],
                // capped at right - i so the guess stays within verified territory
                z[i] = (right - i) as i64;
                if z[i - left] < z[i] {
                    z[i] = z[i - left];
                }
            }
            // extend by direct comparison as far as the match truly goes
            while i + (z[i] as usize) < n && s[z[i] as usize] == s[i + z[i] as usize] {
                z[i] += 1;
            }
            // track the rightmost window; its forward growth bounds work by O(n)
            if i + z[i] as usize > right {
                left = i;
                right = i + z[i] as usize;
            }
        }
        z.iter().sum()
    }
}
