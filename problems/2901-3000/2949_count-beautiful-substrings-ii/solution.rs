use std::collections::HashMap;

impl Solution {
    fn is_vowel(c: u8) -> bool {
        c == b'a' || c == b'e' || c == b'i' || c == b'o' || c == b'u'
    }
    pub fn beautiful_substrings(s: String, k: i32) -> i32 {
        // A beautiful substring has equal vowels and consonants (the
        // prefix vowel-minus-consonant balance is equal at both ends) and
        // with both counts equal to x, x*x % k == 0 holds exactly when x
        // is a multiple of m, the least x >= 1 with x*x % k == 0 — for
        // k = p1^a1 * p2^a2 * ... that is the product of p^ceil(a/2). So
        // a substring counts iff its end balances match and its length is
        // a multiple of 2m, i.e. both end indices agree modulo 2m. One
        // pass counts earlier prefixes with the same (balance, index mod
        // 2m) key, encoded as one i64.
        let mut m: i64 = 1;
        let mut rest: i64 = k as i64;
        let mut p: i64 = 2;
        while p * p <= rest {
            if rest % p == 0 {
                let mut a = 0;
                while rest % p == 0 {
                    rest /= p;
                    a += 1;
                }
                for _ in 0..(a + 1) / 2 {
                    m *= p;
                }
            }
            p += 1;
        }
        if rest > 1 {
            m *= rest;
        }
        let period = (2 * m) as usize;
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut seen: HashMap<i64, i64> = HashMap::new();
        seen.insert(n as i64 * period as i64, 1); // empty prefix: balance 0, index 0
        let mut total: i64 = 0;
        let mut balance: i64 = 0;
        for i in 1..=n {
            balance += if Self::is_vowel(bytes[i - 1]) { 1 } else { -1 };
            let key = (balance + n as i64) * period as i64 + (i % period) as i64;
            let slot = seen.entry(key).or_insert(0);
            total += *slot;
            *slot += 1;
        }
        total as i32
    }
}
