impl Solution {
    pub fn number_of_stable_arrays(zero: i32, one: i32, limit: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let zero = zero as usize;
        let one = one as usize;
        let limit = limit as usize;
        // Count prefixes by usage and last character: f0[a][b] ends in 0,
        // f1[a][b] ends in 1. Each new character extends some block of at
        // most `limit` copies; looping over block lengths collapses into
        // a sliding window over pref0, the row-wise prefix sums of f0,
        // keeping the whole build bottom-up and iterative. Tables and
        // window accumulators are i64: a window sums up to `limit`
        // residues (~10^9), reaching ~2 x 10^11 > 2^31.
        let mut f0 = vec![vec![0i64; one + 1]; zero + 1];
        let mut f1 = vec![vec![0i64; one + 1]; zero + 1];
        let mut pref0 = vec![vec![0i64; one + 2]; zero + 1];
        for a in 1..=zero.min(limit) {
            f0[a][0] = 1;
            pref0[a][1] = 1;
        }
        for b in 1..=one {
            let low = b.saturating_sub(limit);
            for a in 0..=zero {
                if a == 0 {
                    f1[a][b] = if b <= limit { 1 } else { 0 };
                } else {
                    f1[a][b] = (pref0[a][b] - pref0[a][low] + MOD) % MOD;
                }
            }
            let mut running: i64 = 0;
            for a in 1..=zero {
                running += f1[a - 1][b];
                if a >= limit + 1 {
                    running -= f1[a - limit - 1][b];
                    running = ((running % MOD) + MOD) % MOD;
                }
                f0[a][b] = running % MOD;
            }
            for a in 0..=zero {
                pref0[a][b + 1] = (pref0[a][b] + f0[a][b]) % MOD;
            }
        }
        ((f0[zero][one] + f1[zero][one]) % MOD) as i32
    }
}
