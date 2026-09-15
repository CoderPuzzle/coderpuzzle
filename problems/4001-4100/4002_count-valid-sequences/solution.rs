impl Solution {
    pub fn count_valid_sequences(n: i32, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as i64;
        let k = k as i64;
        // Factorials and inverse factorials up to n; the single modular
        // inverse comes from Fermat's little theorem (p prime), no floats.
        let mut fact = vec![1i64; (n + 1) as usize];
        for i in 1..=n {
            fact[i as usize] = fact[(i - 1) as usize] * i % MOD;
        }
        let mut inv_fact = vec![1i64; (n + 1) as usize];
        inv_fact[n as usize] = powmod(fact[n as usize], MOD - 2, MOD);
        for i in (1..=n).rev() {
            inv_fact[(i - 1) as usize] = inv_fact[i as usize] * i % MOD;
        }
        let mut total = comb_mod(n - 1, k - 1, &fact, &inv_fact, MOD);
        // All-odd compositions exist iff n - k is even; substituting each
        // part x_i = 2*y_i + 1 leaves (n-k)/2 spread over k non-negative y_i.
        if (n - k) % 2 == 0 {
            total -= comb_mod((n + k) / 2 - 1, k - 1, &fact, &inv_fact, MOD);
        }
        ((total % MOD + MOD) % MOD) as i32
    }
}

fn comb_mod(a: i64, b: i64, fact: &[i64], inv_fact: &[i64], m: i64) -> i64 {
    if b < 0 || b > a {
        return 0;
    }
    fact[a as usize] * inv_fact[b as usize] % m * inv_fact[(a - b) as usize] % m
}

fn powmod(mut base: i64, mut exp: i64, m: i64) -> i64 {
    let mut r: i64 = 1;
    base %= m;
    while exp > 0 {
        if exp & 1 == 1 {
            r = r * base % m;
        }
        base = base * base % m;
        exp >>= 1;
    }
    r
}
