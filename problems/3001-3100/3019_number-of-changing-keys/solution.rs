impl Solution {
    pub fn count_key_changes(s: String) -> i32 {
        let keys = s.to_lowercase();
        let bytes = keys.as_bytes();
        let mut changes = 0;
        for i in 1..bytes.len() {
            if bytes[i] != bytes[i - 1] {
                changes += 1;
            }
        }
        changes
    }
}
