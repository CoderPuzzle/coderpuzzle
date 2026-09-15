impl Solution {
    // Only the distance matters. With r right and l left steps,
    // r - l = d and r + l = k force d <= k, (k - d) even, and
    // right = (k + d) / 2; any ordering of the steps is a distinct
    // way, so the count is C(k, right) mod 1e9+7.
    pub fn number_of_ways(start_pos: i32, end_pos: i32, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let d = (end_pos as i64 - start_pos as i64).abs();
        if d > k as i64 || (k as i64 - d) % 2 != 0 {
            return 0;
        }
        let right = (k as i64 + d) / 2;

        let mut fact = vec![1i64; k as usize + 1];
        for i in 1..=k as usize {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        fn power(mut base: i64, mut exp: i64, modulus: i64) -> i64 {
            let mut result = 1i64;
            while exp > 0 {
                if exp & 1 == 1 {
                    result = result * base % modulus;
                }
                base = base * base % modulus;
                exp >>= 1;
            }
            result
        }
        let mut inv_fact = vec![1i64; k as usize + 1];
        inv_fact[k as usize] = power(fact[k as usize], MOD - 2, MOD);
        for i in (1..=k as usize).rev() {
            inv_fact[i - 1] = inv_fact[i] * i as i64 % MOD;
        }
        (fact[k as usize] * inv_fact[right as usize] % MOD * inv_fact[(k as i64 - right) as usize] % MOD) as i32
    }
}
