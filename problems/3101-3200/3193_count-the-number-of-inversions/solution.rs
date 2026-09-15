impl Solution {
    pub fn number_of_permutations(n: i32, requirements: Vec<Vec<i32>>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        // req_map[end] = required inversion count (last entry wins on duplicates).
        let mut req_map: Vec<i64> = vec![-1; n];
        let mut max_cnt: usize = 0;
        for r in &requirements {
            req_map[r[0] as usize] = r[1] as i64;
            max_cnt = max_cnt.max(r[1] as usize);
        }

        // dp[j] = number of permutations of length i with j inversions.
        // Growing length i -> i+1 adds between 0 and i new inversions.
        let mut dp: Vec<i64> = vec![0; max_cnt + 1];
        let mut ndp: Vec<i64> = vec![0; max_cnt + 1];
        let mut prefix: Vec<i64> = vec![0; max_cnt + 2];
        dp[0] = 1;
        for i in 1..=n {
            if i > 1 {
                let mut s: i64 = 0;
                for j in 0..=max_cnt {
                    s = (s + dp[j]) % MOD;
                    prefix[j + 1] = s;
                }
                for j in 0..=max_cnt {
                    let lo = (j as i64 - (i as i64 - 1)).max(0) as usize;
                    ndp[j] = (prefix[j + 1] - prefix[lo] + MOD) % MOD;
                }
                std::mem::swap(&mut dp, &mut ndp);
            }
            let target = req_map.get(i - 1).copied().unwrap_or(-1);
            if target >= 0 {
                let c = target as usize;
                for j in 0..=max_cnt {
                    if j != c {
                        dp[j] = 0;
                    }
                }
            }
        }
        dp[req_map[n - 1] as usize] as i32 % (MOD as i32)
    }
}
