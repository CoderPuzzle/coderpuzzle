impl Solution {
    pub fn vowel_consonant_score(s: String) -> i32 {
        // One pass tallies both totals: each character either is one of
        // the five vowels and bumps v, is another lowercase letter and
        // bumps c, or is a space or digit and bumps neither. The score is
        // then the integer quotient floor(v / c), or 0 when no consonant
        // exists to divide by.
        let (mut v, mut c) = (0, 0);
        for b in s.bytes() {
            if matches!(b, b'a' | b'e' | b'i' | b'o' | b'u') {
                v += 1;
            } else if b.is_ascii_lowercase() {
                c += 1;
            }
        }
        if c == 0 {
            0
        } else {
            v / c
        }
    }
}
