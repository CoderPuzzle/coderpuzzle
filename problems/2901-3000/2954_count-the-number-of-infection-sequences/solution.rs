impl Solution {
    pub fn number_of_sequence(n: i32, sick: Vec<i32>) -> i32 {
        // The initially infected people split the line into blocks of
        // uninfected people. An edge block (touching index 0 or n - 1) has
        // only one infectable person per step, so its internal order is
        // forced; an interior block (sick people on both sides) may shed
        // from either endpoint, giving 2^(len - 1) internal orders. Blocks
        // shed independently, so the answer is the multinomial count of
        // ways to interleave the per-step picks across blocks,
        // S! / prod len_i!, times each interior block's 2^(len - 1), all
        // mod 10^9 + 7. n <= 10^5 keeps the factorial tables small; every
        // residue product stays below ~10^18, inside i64.
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let mut fact = vec![1i64; n + 1];
        let mut pow2 = vec![1i64; n + 1];
        for i in 1..=n {
            fact[i] = fact[i - 1] * i as i64 % MOD;
            pow2[i] = pow2[i - 1] * 2 % MOD;
        }
        let mut inv_fact = vec![1i64; n + 1];
        let (mut base, mut result, mut expo) = (fact[n], 1i64, MOD - 2);
        while expo > 0 {
            if expo & 1 == 1 {
                result = result * base % MOD;
            }
            base = base * base % MOD;
            expo >>= 1;
        }
        inv_fact[n] = result;
        for i in (1..=n).rev() {
            inv_fact[i - 1] = inv_fact[i] * i as i64 % MOD;
        }

        let mut ans = fact[n - sick.len()];
        if sick[0] > 0 {
            ans = ans * inv_fact[sick[0] as usize] % MOD;
        }
        for pair in sick.windows(2) {
            let gap = (pair[1] - pair[0] - 1) as usize;
            if gap > 0 {
                ans = ans * inv_fact[gap] % MOD * pow2[gap - 1] % MOD;
            }
        }
        let last = sick[sick.len() - 1] as usize;
        if last < n - 1 {
            ans = ans * inv_fact[n - 1 - last] % MOD;
        }
        ans as i32
    }
}
