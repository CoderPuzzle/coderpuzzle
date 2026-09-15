impl Solution {
    pub fn value_after_k_seconds(n: i32, k: i32) -> i32 {
        // Each second turns the array into its own prefix sums, so the
        // update is one in-place running sum repeated k times. Stored
        // values are always reduced below 10^9 + 7, and a sum of two
        // such residues stays below 2^31, so i32 arithmetic never
        // overflows. After k seconds the last column has counted
        // lattice paths, giving the binomial C(n - 1 + k, k).
        const MOD: i32 = 1_000_000_007;
        let n = n as usize;
        let mut a = vec![1i32; n];
        for _ in 0..k {
            for j in 1..n {
                a[j] = (a[j] + a[j - 1]) % MOD;
            }
        }
        a[n - 1]
    }
}
