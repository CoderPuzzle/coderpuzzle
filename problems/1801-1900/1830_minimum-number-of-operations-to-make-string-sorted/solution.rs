impl Solution {
    // Each operation steps s to its previous lexicographic permutation, so
    // the operation count is the number of distinct permutations of the
    // multiset that are strictly smaller than s. That rank minus one splits
    // per position: with rem slots after i, any remaining letter smaller
    // than s[i] can lead them in rem! / prod(cnt!) arrangements — cnt of
    // the chosen letter one lower. Keeping den = prod(1/cnt!) incrementally
    // folds the multinomial into one multiply per step: the summed
    // contribution is fact[rem] * den * sum(smaller counts), and placing
    // s[i] itself multiplies den by its pre-placement count. Every residue
    // product stays below (10^9 + 7)^2 ~ 10^18, inside i64 range.
    pub fn make_string_sorted(s: String) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = s.len();
        let bytes = s.as_bytes();
        let mut fact = vec![1i64; n + 1];
        for i in 1..=n {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        let mut inv_fact = vec![1i64; n + 1];
        inv_fact[n] = mod_pow(fact[n], MOD - 2, MOD);
        for i in (1..=n).rev() {
            inv_fact[i - 1] = inv_fact[i] * i as i64 % MOD;
        }
        let mut cnt = [0i64; 26];
        for &b in bytes {
            cnt[(b - b'a') as usize] += 1;
        }
        let mut den = 1i64;
        for k in 0..26 {
            den = den * inv_fact[cnt[k] as usize] % MOD;
        }
        let mut ans = 0i64;
        for i in 0..n {
            let c = (bytes[i] - b'a') as usize;
            let smaller: i64 = cnt[..c].iter().sum();
            ans = (ans + fact[n - 1 - i] * den % MOD * smaller) % MOD;
            den = den * cnt[c] % MOD;
            cnt[c] -= 1;
        }
        ans as i32
    }
}

fn mod_pow(mut base: i64, mut exp: i64, modulus: i64) -> i64 {
    let mut result = 1i64;
    base %= modulus;
    while exp > 0 {
        if exp & 1 == 1 {
            result = result * base % modulus;
        }
        base = base * base % modulus;
        exp >>= 1;
    }
    result
}
