impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        // The prefix cannot outlive the shortest string, so scanning column
        // by column stops exactly at the first position any string disagrees
        // on or ends. The alphabet is lowercase ASCII, so byte columns are
        // character columns.
        let first: &str = &strs[0];
        let first_bytes = first.as_bytes();
        for column in 0..first_bytes.len() {
            // A shorter string ending here is as final as a mismatch:
            // nothing can extend the prefix past its last character.
            for s in &strs[1..] {
                let bytes = s.as_bytes();
                if column == bytes.len() || bytes[column] != first_bytes[column] {
                    return first[..column].to_string();
                }
            }
        }
        // Every column of the first string survived every other string.
        first.to_string()
    }
}
