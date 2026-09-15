impl Solution {
    pub fn convert_to_base7(num: i32) -> String {
        // Zero never enters the digit loop, so it gets its own answer here.
        if num == 0 {
            return "0".to_string();
        }
        // Digits of the magnitude come out lowest-first; the sign is kept
        // aside and prepended at the end.
        let negative = num < 0;
        let mut value = num.unsigned_abs();
        let mut digits: Vec<char> = Vec::new();
        while value != 0 {
            // Split off the low base-7 digit, then shift the rest down.
            digits.push((b'0' + (value % 7) as u8) as char);
            value /= 7;
        }
        // Digits come out lowest-first, so reverse for the answer.
        if negative {
            digits.push('-');
        }
        digits.reverse();
        digits.into_iter().collect()
    }
}
