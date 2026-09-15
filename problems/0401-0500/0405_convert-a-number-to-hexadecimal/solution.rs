impl Solution {
    // `as u32` reinterprets the bits: a negative num becomes its
    // two's-complement pattern, and u32 shifts are logical.
    pub fn to_hex(num: i32) -> String {
        // Zero never enters the nibble loop, so it gets its own answer here.
        if num == 0 {
            return "0".to_string();
        }
        let alphabet: &[u8] = b"0123456789abcdef";
        let mut value = num as u32;
        let mut digits: Vec<char> = Vec::new();
        while value != 0 {
            // Take the low nibble, then shift the rest down by one digit.
            digits.push(alphabet[(value & 0xF) as usize] as char);
            value >>= 4;
        }
        // Nibbles come out lowest-first, so reverse for the answer.
        digits.reverse();
        digits.into_iter().collect()
    }
}
