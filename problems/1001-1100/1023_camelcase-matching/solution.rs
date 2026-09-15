impl Solution {
    pub fn camel_match(queries: Vec<String>, pattern: String) -> Vec<bool> {
        let pattern_bytes = pattern.as_bytes();
        queries
            .iter()
            .map(|query| Self::matches(query.as_bytes(), pattern_bytes))
            .collect()
    }

    // Two-pointer scan: advance the pattern pointer on a match, skip a
    // lowercase letter as an implicit insertion, and reject outright on an
    // uppercase letter that doesn't match. The query matches only if every
    // pattern character was consumed by the end of the scan.
    fn matches(query: &[u8], pattern: &[u8]) -> bool {
        let mut j = 0;
        for &c in query {
            if j < pattern.len() && c == pattern[j] {
                j += 1;
            } else if c.is_ascii_uppercase() {
                return false;
            }
        }
        j == pattern.len()
    }
}
