impl Solution {
    fn is_vowel(c: u8) -> bool {
        c == b'a' || c == b'e' || c == b'i' || c == b'o' || c == b'u'
    }
    pub fn beautiful_substrings(s: String, k: i32) -> i32 {
        // Straight from the definition: for each start, extend the
        // substring while maintaining the vowel-minus-consonant balance.
        // Balance 0 means equal vowel and consonant counts, each equal to
        // half the length, so the divisibility test is
        // ((L / 2) * (L / 2)) % k == 0.
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut total = 0i32;
        for i in 0..n {
            let mut balance = 0i32;
            for j in i..n {
                balance += if Self::is_vowel(bytes[j]) { 1 } else { -1 };
                if balance == 0 {
                    let half = ((j - i + 1) / 2) as i32;
                    if (half * half) % k == 0 {
                        total += 1;
                    }
                }
            }
        }
        total
    }
}
