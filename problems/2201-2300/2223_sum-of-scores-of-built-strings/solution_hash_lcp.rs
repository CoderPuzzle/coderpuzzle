impl Solution {
    pub fn sum_scores(s: String) -> i64 {
        let s = s.as_bytes();
        let n = s.len();
        if n == 0 {
            return 0;
        }
        let a: Vec<i64> = s.iter().map(|&b| (b - b'a') as i64).collect();
        const MOD1: i64 = 1_000_000_007;
        const MOD2: i64 = 1_000_000_009;
        const BASE: i64 = 26;

        // Prefix hashes under two independent moduli plus base powers, so any
        // question "does the suffix at i agree with the prefix for L chars?" is
        // answered from three table reads.
        let mut pow1 = vec![1i64; n + 1];
        let mut pow2 = vec![1i64; n + 1];
        let mut pre1 = vec![0i64; n + 1];
        let mut pre2 = vec![0i64; n + 1];
        for i in 1..=n {
            pow1[i] = pow1[i - 1] * BASE % MOD1;
            pow2[i] = pow2[i - 1] * BASE % MOD2;
            pre1[i] = (pre1[i - 1] * BASE + a[i - 1]) % MOD1;
            pre2[i] = (pre2[i - 1] * BASE + a[i - 1]) % MOD2;
        }

        // The prefix's own hash is pre[L]; the suffix-at-i window's hash is
        // pre[i+L] - pre[i] * BASE^L, normalized. Agreement under both moduli
        // accepts the length; a coincidental double match is a collision,
        // roughly one chance in 10^18 per probe.
        let agrees = |i: usize, l: usize| -> bool {
            let h1 = (pre1[i + l] - pre1[i] * pow1[l]).rem_euclid(MOD1);
            let h2 = (pre2[i + l] - pre2[i] * pow2[l]).rem_euclid(MOD2);
            h1 == pre1[l] && h2 == pre2[l]
        };

        // Agreement for L characters implies agreement at every shorter
        // length, so the predicate is prefix-monotone: binary-search each
        // suffix's longest common prefix with s. s itself scores n.
        let mut total = n as i64;
        for i in 1..n {
            let mut lo = 0usize;
            let mut hi = n - i;
            while lo < hi {
                let mid = (lo + hi + 1) / 2;
                if agrees(i, mid) {
                    lo = mid;
                } else {
                    hi = mid - 1;
                }
            }
            total += lo as i64;
        }
        total
    }
}
