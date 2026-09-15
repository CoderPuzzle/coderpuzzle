impl Solution {
    pub fn product_queries(n: i32, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // The minimum set of powers of two summing to n is exactly its set
        // bits (hint 1), so powers is the sorted list of 1 << b for each
        // set bit b. A range product of ascending powers of two is itself
        // a power of two — 2^(exponent sum) — but under the modulus the
        // clean tool is prefix products with one modular inverse per query
        // (Fermat, MOD prime): product(lo..hi) = pref[hi+1] * inv(pref[lo]).
        const MOD: i64 = 1_000_000_007;
        let mut powers: Vec<i64> = Vec::new();
        for b in 0..30 {
            if n >> b & 1 == 1 {
                powers.push(1i64 << b);
            }
        }
        let mut pref: Vec<i64> = Vec::with_capacity(powers.len() + 1);
        pref.push(1);
        for v in &powers {
            pref.push(*pref.last().unwrap() * *v % MOD);
        }
        queries
            .iter()
            .map(|query| {
                let (lo, hi) = (query[0] as usize, query[1] as usize);
                (pref[hi + 1] * pow_mod(pref[lo], MOD - 2, MOD) % MOD) as i32
            })
            .collect()
    }
}

fn pow_mod(mut base: i64, mut exp: i64, modulus: i64) -> i64 {
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
