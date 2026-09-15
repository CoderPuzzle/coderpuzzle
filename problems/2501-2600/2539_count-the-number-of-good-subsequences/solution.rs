impl Solution {
    // A good subsequence is generated exactly once by its shared
    // frequency m: each letter either sits out or contributes C(count, m)
    // index choices, so every per-m product counts one term of the answer
    // - plus the all-absent pick that surfaces in every product and is
    // dropped once per term. Factorial tables modulo 1e9+7, division via
    // Fermat inverses.
    pub fn count_good_subsequences(s: String) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut counts = [0i64; 26];
        for b in s.as_bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        let mut top = 0usize;
        let mut present: Vec<i64> = Vec::new();
        for &c in counts.iter() {
            if c as usize > top {
                top = c as usize;
            }
            if c > 0 {
                present.push(c);
            }
        }
        let mut fact = vec![1i64; top + 1];
        for i in 2..=top {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        let mut inv_fact = vec![1i64; top + 1];
        inv_fact[top] = mod_pow(fact[top], MOD - 2);
        for i in (1..=top).rev() {
            inv_fact[i - 1] = inv_fact[i] * i as i64 % MOD;
        }
        let mut total: i64 = 0;
        for m in 1..=top {
            let mut prod: i64 = 1;
            for &count in present.iter() {
                prod = prod * (comb(count, m as i64, &fact, &inv_fact) + 1) % MOD;
            }
            total += prod - 1;
        }
        (total % MOD) as i32
    }
}

fn comb(n: i64, k: i64, fact: &[i64], inv_fact: &[i64]) -> i64 {
    const MOD: i64 = 1_000_000_007;
    if k > n {
        return 0;
    }
    let n = n as usize;
    let k = k as usize;
    fact[n] * inv_fact[k] % MOD * inv_fact[n - k] % MOD
}

fn mod_pow(mut base: i64, mut exp: i64) -> i64 {
    const MOD: i64 = 1_000_000_007;
    let mut result: i64 = 1;
    base %= MOD;
    while exp > 0 {
        if exp & 1 == 1 {
            result = result * base % MOD;
        }
        base = base * base % MOD;
        exp >>= 1;
    }
    result
}
