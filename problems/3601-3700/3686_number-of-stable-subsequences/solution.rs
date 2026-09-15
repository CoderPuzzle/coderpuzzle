impl Solution {
    pub fn count_stable_subsequences(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // Three same-parity elements in a row are the only way a subsequence
        // breaks, so four counters describe every stable subsequence seen so
        // far: trailing even run of length 1 or 2, trailing odd run of 1 or
        // 2. Each update sums at most four residues, so i64 never overflows.
        let mut e1 = 0i64;
        let mut e2 = 0i64;
        let mut o1 = 0i64;
        let mut o2 = 0i64;
        for &x in &nums {
            if x % 2 == 0 {
                // Fresh subsequence, odd-ending extensions (the even run
                // restarts at 1), or an even run of 1 promoted to 2; both
                // updates read the old counters before either lands.
                let ne1 = (e1 + o1 + o2 + 1) % MOD;
                let ne2 = (e2 + e1) % MOD;
                e1 = ne1;
                e2 = ne2;
            } else {
                // Mirror image with odd and even swapped.
                let no1 = (o1 + e1 + e2 + 1) % MOD;
                let no2 = (o2 + o1) % MOD;
                o1 = no1;
                o2 = no2;
            }
        }
        ((e1 + e2 + o1 + o2) % MOD) as i32
    }
}
