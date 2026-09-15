impl Solution {
    pub fn ways_to_fill_array(queries: Vec<Vec<i32>>) -> Vec<i32> {
        const MOD: i64 = 1_000_000_007;
        const MAX: usize = 20000;

        let mut fact = vec![1i64; MAX + 1];
        for i in 1..=MAX {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        let mod_pow = |base: i64, mut exp: i64| -> i64 {
            let mut result = 1i64;
            let mut b = base % MOD;
            while exp > 0 {
                if exp & 1 == 1 {
                    result = result * b % MOD;
                }
                b = b * b % MOD;
                exp >>= 1;
            }
            result
        };
        let mut inv_fact = vec![1i64; MAX + 1];
        // One Fermat inversion at the top; running it backwards yields every
        // smaller inverse factorial with a single multiplication each.
        inv_fact[MAX] = mod_pow(fact[MAX], MOD - 2);
        for i in (1..=MAX).rev() {
            inv_fact[i - 1] = inv_fact[i] * i as i64 % MOD;
        }

        let comb = |n: i64, r: i64| -> i64 {
            if r < 0 || r > n {
                return 0;
            }
            fact[n as usize] * inv_fact[r as usize] % MOD * inv_fact[(n - r) as usize] % MOD
        };

        let mut answers = Vec::with_capacity(queries.len());
        for query in &queries {
            let n = query[0] as i64;
            let mut k = query[1];
            let mut ways = 1i64;
            // Trial division up to sqrt(k) collects each prime's exponent.
            let mut d = 2i32;
            while d as i64 * d as i64 <= k as i64 {
                if k % d == 0 {
                    let mut exponent = 0i64;
                    while k % d == 0 {
                        k /= d;
                        exponent += 1;
                    }
                    // Primes never interact, so the per-prime counts
                    // multiply: spreading x copies of one prime over n
                    // slots is stars and bars, C(x + n - 1, n - 1).
                    ways = ways * comb(exponent + n - 1, n - 1) % MOD;
                }
                d += 1;
            }
            // A leftover greater than 1 is a prime of exponent 1.
            if k > 1 {
                ways = ways * comb(1 + n - 1, n - 1) % MOD;
            }
            answers.push(ways as i32);
        }
        answers
    }
}
