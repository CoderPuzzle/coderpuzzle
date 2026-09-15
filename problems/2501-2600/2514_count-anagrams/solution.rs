impl Solution {
    pub fn count_anagrams(s: String) -> i32 {
        // Product over words of the multinomial len!/prod(count!), all
        // reduced modulo 1e9+7; division becomes multiplication by the
        // Fermat inverse x^(p-2).
        const MOD: i64 = 1_000_000_007;
        let bytes = s.as_bytes();
        let mut answer: i64 = 1;
        let mut start = 0usize;
        for i in 0..=bytes.len() {
            if i == bytes.len() || bytes[i] == b' ' {
                answer = answer * word_ways(bytes, start, i) % MOD;
                start = i + 1;
            }
        }
        answer as i32
    }
}

fn word_ways(bytes: &[u8], from: usize, to: usize) -> i64 {
    const MOD: i64 = 1_000_000_007;
    let mut counts = [0i64; 26];
    for &b in &bytes[from..to] {
        counts[(b - b'a') as usize] += 1;
    }
    let mut term = factorial_mod((to - from) as i64);
    for count in counts.iter() {
        if *count > 1 {
            term = term * mod_pow(factorial_mod(*count), MOD - 2) % MOD;
        }
    }
    term
}

fn factorial_mod(n: i64) -> i64 {
    const MOD: i64 = 1_000_000_007;
    let mut result: i64 = 1;
    for i in 2..=n {
        result = result * i % MOD;
    }
    result
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
