impl Solution {
    // Only the positions of c matter: a substring starts and ends with c
    // exactly when both endpoints land on an occurrence, so choosing a
    // substring is choosing two (not necessarily distinct) occurrences,
    // in order. With m occurrences that is m*(m+1)/2 pairs, which can
    // reach 5000050000 at n = 100000 — beyond 32-bit, so the count and
    // the product both live in i64.
    pub fn count_substrings(s: String, c: String) -> i64 {
        let target = c.as_bytes()[0];
        let mut m = 0i64;
        for &byte in s.as_bytes() {
            if byte == target {
                m += 1;
            }
        }
        m * (m + 1) / 2
    }
}
