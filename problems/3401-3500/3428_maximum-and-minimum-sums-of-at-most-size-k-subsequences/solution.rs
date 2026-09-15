impl Solution {
    pub fn min_max_sums(nums: Vec<i32>, k: i32) -> i32 {
        // After sorting, nums[i] is the maximum of exactly those
        // subsequences whose other members come from the i smaller
        // entries: summed over sizes 1..k that is g(i) = sum_{j < k}
        // C(i, j) subsequences, and symmetrically it is the minimum of
        // g(n-1-i) of them (the larger entries). So the answer is
        // sum nums[i] * (g(i) + g(n-1-i)) mod 10^9 + 7. Each partial row
        // sum rolls in O(1): Pascal gives C(i, j) = C(i-1, j) +
        // C(i-1, j-1), so g(i) = 2*g(i-1) - C(i-1, k-1), one binomial per
        // step from factorial tables. n <= 10^5 keeps those tables small;
        // every residue product stays below ~10^18, inside i64.
        const MOD: i64 = 1_000_000_007;
        let k = k as usize;
        let mut nums = nums;
        nums.sort_unstable();
        let n = nums.len();

        let mut fact = vec![1i64; n];
        for i in 1..n {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        let mut inv_fact = vec![1i64; n];
        inv_fact[n - 1] = Self::mod_pow(fact[n - 1], MOD - 2, MOD);
        for i in (1..n).rev() {
            inv_fact[i - 1] = inv_fact[i] * i as i64 % MOD;
        }
        let choose = |a: usize, b: usize| -> i64 {
            if b > a {
                return 0;
            }
            fact[a] * inv_fact[b] % MOD * inv_fact[a - b] % MOD
        };

        let mut g = vec![0i64; n];
        g[0] = 1;
        for i in 1..n {
            g[i] = (2 * g[i - 1] % MOD + MOD - choose(i - 1, k - 1)) % MOD;
        }
        let mut total = 0i64;
        for i in 0..n {
            total = (total + nums[i] as i64 % MOD * ((g[i] + g[n - 1 - i]) % MOD)) % MOD;
        }
        total as i32
    }

    fn mod_pow(mut base: i64, mut exp: i64, module: i64) -> i64 {
        let mut result = 1i64;
        base %= module;
        while exp > 0 {
            if exp & 1 == 1 {
                result = result * base % module;
            }
            base = base * base % module;
            exp >>= 1;
        }
        result
    }
}
