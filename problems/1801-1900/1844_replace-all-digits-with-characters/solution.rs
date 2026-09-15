impl Solution {
    // shift(c, x) is plain character arithmetic: c + x. Each digit at an
    // odd index pairs with the letter immediately before it.
    pub fn replace_digits(s: String) -> String {
        let mut bytes: Vec<u8> = s.into_bytes();
        for i in (1..bytes.len()).step_by(2) {
            bytes[i] = bytes[i - 1] + (bytes[i] - b'0');
        }
        String::from_utf8(bytes).unwrap()
    }
}
