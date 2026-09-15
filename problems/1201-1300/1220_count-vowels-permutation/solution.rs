impl Solution {
    pub fn count_vowel_permutation(n: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // one counter per vowel: counts of length-L strings ending in that
        // vowel — only the last character constrains the next one
        let (mut a, mut e, mut i, mut o, mut u) = (1i64, 1i64, 1i64, 1i64, 1i64);
        for _ in 0..n - 1 {
            // follower rules: a<-e,i,u; e<-a,i; i<-e,o; o<-i; u<-i,o.
            // All five are computed from the old values before any is
            // assigned, so no partially updated state leaks into the step;
            // the mod keeps the exponentially growing counts bounded
            let (na, ne, ni, no, nu) = ((e + i + u) % MOD, (a + i) % MOD, (e + o) % MOD, i, (i + o) % MOD);
            a = na;
            e = ne;
            i = ni;
            o = no;
            u = nu;
        }
        // n = 1 never enters the loop and sums the initial five 1s
        ((a + e + i + o + u) % MOD) as i32
    }
}
