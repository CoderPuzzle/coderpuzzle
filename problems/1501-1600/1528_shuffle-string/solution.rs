impl Solution {
    pub fn restore_string(s: String, indices: Vec<i32>) -> String {
        // indices[i] names s[i]'s destination outright, so just write each
        // byte straight into its final slot.
        let bytes = s.as_bytes();
        let mut result = vec![0u8; bytes.len()];
        for (i, &b) in bytes.iter().enumerate() {
            result[indices[i] as usize] = b;
        }
        String::from_utf8(result).unwrap()
    }
}
