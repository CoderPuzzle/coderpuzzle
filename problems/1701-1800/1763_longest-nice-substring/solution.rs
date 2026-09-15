impl Solution {
    pub fn longest_nice_substring(s: String) -> String {
        // A character missing its case-partner anywhere in the string
        // can never sit inside a nice window: split on every offender
        // and recurse. Segments with no offenders are entirely nice.
        if s.len() < 2 {
            return String::new();
        }
        let b = s.as_bytes();
        for i in 0..b.len() {
            let c = b[i];
            let other = if c.is_ascii_lowercase() {
                c.to_ascii_uppercase()
            } else {
                c.to_ascii_lowercase()
            };
            if !b.contains(&other) {
                let left = Self::longest_nice_substring(s[..i].to_string());
                let right = Self::longest_nice_substring(s[i + 1..].to_string());
                return if left.len() >= right.len() { left } else { right };
            }
        }
        s
    }
}
