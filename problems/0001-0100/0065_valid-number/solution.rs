impl Solution {
    pub fn is_number(s: String) -> bool {
        // One left-to-right scan over the grammar's skeleton: sign, mantissa
        // (integer or decimal), optional exponent. seen_digit is scoped to the
        // part being read — the mantissa first, then the exponent after the
        // 'e'/'E' resets it.
        let bytes = s.as_bytes();
        let mut seen_digit = false;
        let mut seen_dot = false;
        let mut seen_exp = false;
        for i in 0..bytes.len() {
            let c = bytes[i];
            if c.is_ascii_digit() {
                seen_digit = true;
            } else if c == b'+' || c == b'-' {
                // A sign is legal only at the very start or right after 'e'/'E'.
                if i > 0 && bytes[i - 1] != b'e' && bytes[i - 1] != b'E' {
                    return false;
                }
            } else if c == b'.' {
                // At most one dot, and only in the mantissa: the exponent is an integer.
                if seen_dot || seen_exp {
                    return false;
                }
                seen_dot = true;
            } else if c == b'e' || c == b'E' {
                // At most one exponent, and only after the mantissa has shown a digit.
                if seen_exp || !seen_digit {
                    return false;
                }
                seen_exp = true;
                seen_digit = false;
            } else {
                // Any other character (every letter but e/E) is invalid.
                return false;
            }
        }
        // The last part read must have contained at least one digit.
        seen_digit
    }
}
