impl Solution {
    // A star deletes the most recently kept character, so keep a stack
    // of survivors: push letters, pop on stars.
    pub fn remove_stars(s: String) -> String {
        let mut kept = Vec::with_capacity(s.len());
        for c in s.chars() {
            if c == '*' {
                kept.pop();
            } else {
                kept.push(c);
            }
        }
        kept.into_iter().collect()
    }
}
