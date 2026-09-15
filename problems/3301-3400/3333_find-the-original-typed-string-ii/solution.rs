impl Solution {
    pub fn possible_string_count(word: String, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // Each maximal run of length c contributes between 1 and c intended
        // characters; count tuples of total length >= k as total - (length < k).
        let bytes = word.as_bytes();
        let n = bytes.len();
        let mut runs: Vec<usize> = Vec::new();
        let mut i = 0;
        while i < n {
            let mut j = i;
            while j < n && bytes[j] == bytes[i] {
                j += 1;
            }
            runs.push(j - i);
            i = j;
        }

        let r = runs.len();
        let k = k as usize;
        let mut total: i64 = 1;
        for &c in &runs {
            total = total * (c as i64) % MOD;
        }
        if k <= r {
            return total as i32; // every tuple already has length >= r >= k
        }

        // dp[j] = number of ways to reach total length j (< k).
        let mut dp: Vec<i64> = vec![0; k];
        let mut ndp: Vec<i64> = vec![0; k];
        let mut prefix: Vec<i64> = vec![0; k + 1];
        dp[0] = 1;
        for &c in &runs {
            let mut s: i64 = 0;
            for j in 0..k {
                s = (s + dp[j]) % MOD;
                prefix[j + 1] = s;
            }
            for j in 1..k {
                let lo = (j as i64 - c as i64).max(0) as usize;
                ndp[j] = (prefix[j] - prefix[lo] + MOD) % MOD;
            }
            ndp[0] = 0;
            std::mem::swap(&mut dp, &mut ndp);
        }

        let mut bad: i64 = 0;
        for j in 0..k {
            bad = (bad + dp[j]) % MOD;
        }
        (((total - bad) % MOD + MOD) % MOD) as i32
    }
}
