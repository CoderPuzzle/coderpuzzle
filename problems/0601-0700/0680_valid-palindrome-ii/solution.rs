impl Solution {
    // Walk two pointers inward while the outer pairs agree. The first
    // mismatch is the only place a deletion can matter: it must remove
    // one end of the broken pair, so the answer is whether the stretch
    // without the left char or the stretch without the right char is an
    // exact palindrome. An unbroken walk needs no deletion at all.
    pub fn valid_palindrome(s: String) -> bool {
        let bytes = s.as_bytes();
        let (mut lo, mut hi) = (0, bytes.len() - 1);
        while lo < hi {
            if bytes[lo] != bytes[hi] {
                return Self::is_palindrome(bytes, lo + 1, hi) || Self::is_palindrome(bytes, lo, hi - 1);
            }
            lo += 1;
            hi -= 1;
        }
        true
    }

    fn is_palindrome(bytes: &[u8], mut lo: usize, mut hi: usize) -> bool {
        while lo < hi {
            if bytes[lo] != bytes[hi] {
                return false;
            }
            lo += 1;
            hi -= 1;
        }
        true
    }
}
