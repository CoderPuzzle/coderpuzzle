impl Solution {
    pub fn shortest_common_supersequence(str1: String, str2: String) -> String {
        let a = str1.as_bytes();
        let b = str2.as_bytes();
        let n = a.len();
        let m = b.len();
        // dp[i][j] = length of the LCS of str1[i:] and str2[j:].
        let mut dp = vec![vec![0usize; m + 1]; n + 1];
        for i in (0..n).rev() {
            for j in (0..m).rev() {
                if a[i] == b[j] {
                    dp[i][j] = dp[i + 1][j + 1] + 1;
                } else {
                    dp[i][j] = dp[i + 1][j].max(dp[i][j + 1]);
                }
            }
        }

        let mut parts: Vec<u8> = Vec::with_capacity(n + m);
        let mut i = 0;
        let mut j = 0;
        while i < n && j < m {
            if a[i] == b[j] {
                parts.push(a[i]);
                i += 1;
                j += 1;
            } else if dp[i + 1][j] >= dp[i][j + 1] {
                parts.push(a[i]);
                i += 1;
            } else {
                parts.push(b[j]);
                j += 1;
            }
        }
        parts.extend_from_slice(&a[i..]);
        parts.extend_from_slice(&b[j..]);
        String::from_utf8(parts).unwrap()
    }
}
