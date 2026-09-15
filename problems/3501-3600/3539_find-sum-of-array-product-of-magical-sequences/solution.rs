impl Solution {
    pub fn magical_sum(m: i32, k: i32, nums: Vec<i32>) -> i32 {
        // Forward DP over the indices of nums. State (j, b, mask) after a
        // prefix of indices: j sequence slots filled, b set bits of the sum
        // already finalized (every bit below the current index is fixed,
        // since later terms only add multiples of 2^i), and mask = partial
        // sum >> i, the carry window of not-yet-settled high bits (< 2^5).
        const MOD: i64 = 1_000_000_007;
        let (m, k) = (m as usize, k as usize);
        let n = nums.len();
        // comb[a][c]: ways to scatter c copies of index i into the a = m - j
        // sequence slots still unassigned.
        let mut comb = vec![vec![0i64; m + 1]; m + 1];
        for a in 0..=m {
            comb[a][0] = 1;
            for c in 1..=a {
                comb[a][c] = (comb[a - 1][c - 1] + comb[a - 1][c]) % MOD;
            }
        }
        // pw[i][c] = nums[i]^c mod MOD (64-bit: the raw powers reach 1e16).
        let mut pw = vec![vec![1i64; m + 1]; n];
        for i in 0..n {
            for c in 1..=m {
                pw[i][c] = pw[i][c - 1] * nums[i] as i64 % MOD;
            }
        }
        let pc = |x: i64| x.count_ones() as usize;
        let mut dp = vec![vec![vec![0i64; 32]; m + 1]; m + 1];
        dp[0][0][0] = 1;
        for i in 0..n {
            let mut ndp = vec![vec![vec![0i64; 32]; m + 1]; m + 1];
            for j in 0..=m {
                for b in 0..=m {
                    for mask in 0..32 {
                        let v = dp[j][b][mask];
                        if v == 0 {
                            continue;
                        }
                        for c in 0..=(m - j) {
                            let t = mask + c;
                            let nb = b + (t & 1);
                            // Set bits of a sum of j+c powers never exceed
                            // j+c: prune lanes that can no longer reach k.
                            if nb + pc((t >> 1) as i64) > j + c {
                                continue;
                            }
                            let add = v * comb[m - j][c] % MOD * pw[i][c] % MOD;
                            ndp[j + c][nb][t >> 1] = (ndp[j + c][nb][t >> 1] + add) % MOD;
                        }
                    }
                }
            }
            dp = ndp;
        }
        // After the last index, mask holds every remaining high bit: the
        // total set-bit count of the sum is b + popcount(mask).
        let mut ans = 0i64;
        for b in 0..=m {
            for mask in 0..32 {
                if b + pc(mask as i64) == k {
                    ans = (ans + dp[m][b][mask]) % MOD;
                }
            }
        }
        ans as i32
    }
}
