impl Solution {
    // Walk backward from the end while the current digit is '0'; the
    // skipped suffix is exactly the trailing zeros. num represents a
    // positive integer with no leading zeros, so some digit is non-zero
    // and the scan always stops in bounds.
    pub fn remove_trailing_zeros(num: String) -> String {
        let mut keep = num.len();
        let bytes = num.as_bytes();
        while bytes[keep - 1] == b'0' {
            keep -= 1;
        }
        num[..keep].to_string()
    }
}
