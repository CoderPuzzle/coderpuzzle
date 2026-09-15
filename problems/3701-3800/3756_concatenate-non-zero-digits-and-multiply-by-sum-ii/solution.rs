impl Solution {
    pub fn sum_and_multiply(s: String, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // Prefix arrays over the NON-ZERO digits: pref_val keeps the value
        // mod M of concatenating them, pref_sum their digit sum, pref_cnt
        // their count. The compressed substring s[l..r] is the slice of the
        // non-zero sequence between indexes cnt[l] and cnt[r+1]; its value
        // is recoverable from the two prefix values with one pow10 shift,
        // and its digit sum is a plain prefix difference (zeros add 0 to
        // both). All products stay below (1e9+7)^2 ~ 1e18, inside i64.
        const MOD: i64 = 1_000_000_007;
        let n = s.len();
        let bytes = s.as_bytes();
        let mut pref_val = vec![0_i64; n + 1];
        let mut pref_sum = vec![0_i64; n + 1];
        let mut pref_cnt = vec![0_i32; n + 1];
        let mut pow10 = vec![0_i64; n + 1];
        pow10[0] = 1;
        for i in 0..n {
            let d = (bytes[i] - b'0') as i64;
            pref_val[i + 1] = pref_val[i];
            pref_sum[i + 1] = pref_sum[i] + d;
            pref_cnt[i + 1] = pref_cnt[i];
            pow10[i + 1] = pow10[i] * 10 % MOD;
            if bytes[i] != b'0' {
                pref_val[i + 1] = (pref_val[i] * 10 + d) % MOD;
                pref_cnt[i + 1] += 1;
            }
        }
        queries
            .iter()
            .map(|query| {
                let (l, r) = (query[0] as usize, query[1] as usize);
                let k = (pref_cnt[r + 1] - pref_cnt[l]) as usize;
                // x = the concatenation of the k non-zero digits in s[l..r];
                // pref_val[r+1] = pref_val[l] * 10^k + x, so solve for x.
                let x = (pref_val[r + 1] - pref_val[l] * pow10[k]) % MOD;
                let x = if x < 0 { x + MOD } else { x };
                let digit_sum = pref_sum[r + 1] - pref_sum[l];
                ((x * digit_sum) % MOD) as i32
            })
            .collect()
    }
}
