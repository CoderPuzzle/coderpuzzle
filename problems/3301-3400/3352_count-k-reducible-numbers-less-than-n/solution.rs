impl Solution {
    pub fn count_k_reducible_numbers(s: String, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let s = s.as_bytes();
        let l = s.len();
        // f[x] = number of operations to reduce x to 1.
        let mut f = vec![0i32; l + 1];
        for x in 2..=l {
            let bits = (x as u32).count_ones() as usize;
            f[x] = 1 + f[bits];
        }
        // Pascal's triangle mod MOD.
        let mut c = vec![vec![0i64; l + 1]; l + 1];
        for i in 0..=l {
            c[i][0] = 1;
            for j in 1..=i {
                c[i][j] = (c[i - 1][j - 1] + c[i - 1][j]) % MOD;
            }
        }
        // cnt[p] = number of integers x in [0, n-1] with popcount(x) == p.
        let mut cnt = vec![0i64; l + 1];
        let mut ones = 0usize;
        for i in 0..l {
            if s[i] == b'1' {
                let remaining = l - i - 1;
                for p in 0..=remaining {
                    let idx = ones + p;
                    cnt[idx] = (cnt[idx] + c[remaining][p]) % MOD;
                }
                ones += 1;
            }
        }
        let mut ans: i64 = 0;
        for p in 1..=l {
            if 1 + f[p] <= k {
                ans = (ans + cnt[p]) % MOD;
            }
        }
        ans as i32
    }
}
