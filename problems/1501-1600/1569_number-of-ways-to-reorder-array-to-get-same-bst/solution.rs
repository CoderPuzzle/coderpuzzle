impl Solution {
    pub fn num_of_ways(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();

        // Factorials and their modular inverses (Fermat's little theorem:
        // MOD is prime, so inv(k!) == (k!)^(MOD - 2) mod MOD) answer every
        // C(a, b) query in O(1).
        let mut fact = vec![1i64; n + 1];
        for i in 1..=n {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        let power = |mut base: i64, mut exp: i64| -> i64 {
            let mut result = 1i64;
            base %= MOD;
            while exp > 0 {
                if exp & 1 == 1 {
                    result = result * base % MOD;
                }
                base = base * base % MOD;
                exp >>= 1;
            }
            result
        };
        let mut inv_fact = vec![1i64; n + 1];
        inv_fact[n] = power(fact[n], MOD - 2);
        for i in (1..=n).rev() {
            inv_fact[i - 1] = inv_fact[i] * i as i64 % MOD;
        }

        let comb = |a: usize, b: usize| -> i64 { fact[a] * inv_fact[b] % MOD * inv_fact[a - b] % MOD };

        // ways(arr) counts every reordering of arr (including arr itself)
        // that builds the same BST: split at the root arr[0], recurse on
        // the smaller-than-root and larger-than-root runs (each must keep
        // its own relative order), then multiply by the number of ways to
        // interleave the two runs into one sequence of their combined
        // length, which is the binomial coefficient of the two run sizes.
        fn ways(arr: &[i32], comb: &dyn Fn(usize, usize) -> i64) -> i64 {
            if arr.len() <= 1 {
                return 1;
            }
            let root = arr[0];
            let left: Vec<i32> = arr[1..].iter().copied().filter(|&x| x < root).collect();
            let right: Vec<i32> = arr[1..].iter().copied().filter(|&x| x > root).collect();
            let c = comb(left.len() + right.len(), left.len());
            c * ways(&left, comb) % MOD * ways(&right, comb) % MOD
        }

        // The problem excludes the original array from the count.
        (((ways(&nums, &comb) - 1) % MOD + MOD) % MOD) as i32
    }
}
