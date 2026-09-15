impl Solution {
    pub fn num_perms_di_sequence(s: String) -> i32 {
        // dp[i][j] counts ways to fill the first i+1 positions, valid so
        // far, with position i holding the j-th smallest value placed.
        // Appending a value of new rank j shifts older ranks >= j up one,
        // so an 'I' step admits exactly the old ranks below j and a 'D'
        // step the old ranks j and above — both are prefix sums of the
        // previous row: P[j] for 'I', P[m] - P[j] for 'D'. One rolling
        // row carries the table; the answer is sum dp[n][*].
        const MOD: i64 = 1_000_000_007;
        let mut dp: Vec<i64> = vec![1];
        for ch in s.bytes() {
            let m = dp.len();
            let mut prefix = vec![0i64; m + 1];
            for j in 0..m {
                prefix[j + 1] = (prefix[j] + dp[j]) % MOD;
            }
            if ch == b'I' {
                dp = prefix;
            } else {
                let mut next = vec![0i64; m + 1];
                for j in 0..=m {
                    next[j] = (prefix[m] - prefix[j] + MOD) % MOD;
                }
                dp = next;
            }
        }
        let total: i64 = dp.iter().sum();
        (total % MOD) as i32
    }
}
