impl Solution {
    // Only a proper divisor length can work: the block must divide n and
    // be shorter than it, so s is at least two copies of the block.
    pub fn repeated_substring_pattern(s: String) -> bool {
        let n = s.len();
        for d in 1..=n / 2 {
            if n % d == 0 && s[..d].repeat(n / d) == s {
                return true;
            }
        }
        false
    }
}
