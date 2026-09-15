impl Solution {
    pub fn find_the_longest_balanced_substring(s: String) -> i32 {
        // One pass with two run counters: `zeros` is the length of the zero
        // block currently ending (reset when a fresh block starts after ones),
        // `ones` is the running tail of consecutive ones. A balanced substring
        // is always a prefix-tail pairing min(zeros, ones) of both, so every
        // one seen offers 2 * min as a candidate answer.
        let mut best = 0;
        let (mut zeros, mut ones) = (0usize, 0usize);
        let mut prev = b' ';
        for &ch in s.as_bytes() {
            if ch == b'0' {
                zeros = if prev == b'0' { zeros + 1 } else { 1 };
                ones = 0;
            } else {
                ones += 1;
                best = best.max(2 * zeros.min(ones));
            }
            prev = ch;
        }
        best as i32
    }
}
