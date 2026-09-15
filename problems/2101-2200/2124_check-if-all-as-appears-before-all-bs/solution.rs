impl Solution {
    pub fn check_string(s: String) -> bool {
        let mut seen_b = false;
        for character in s.bytes() {
            if character == b'b' {
                seen_b = true;
            } else if seen_b {
                return false;
            }
        }
        true
    }
}
