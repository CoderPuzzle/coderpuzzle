impl Solution {
    pub fn my_atoi(s: String) -> i32 {
        // One left-to-right scan over s implements the statement's four steps
        // in order: whitespace, signedness, conversion, rounding.
        let bytes = s.as_bytes();
        let mut i = 0;
        while i < bytes.len() && bytes[i] == b' ' {
            i += 1;
        }
        let mut sign = 1i64;
        if i < bytes.len() && (bytes[i] == b'+' || bytes[i] == b'-') {
            if bytes[i] == b'-' {
                sign = -1;
            }
            i += 1;
        }
        // 64-bit accumulator: the early clamp below keeps it within 2^31 - 1,
        // so even a 200-digit run can never overflow it.
        let mut total: i64 = 0;
        while i < bytes.len() && bytes[i].is_ascii_digit() {
            let digit = (bytes[i] - b'0') as i64;
            // Clamp on the fly: if appending this digit would pass 2^31 - 1,
            // the value is out of range and the answer is the boundary in the
            // sign's direction.
            if total > (2147483647 - digit) / 10 {
                return if sign == 1 { 2147483647 } else { -2147483648 };
            }
            total = total * 10 + digit;
            i += 1;
        }
        (sign * total) as i32
    }
}
