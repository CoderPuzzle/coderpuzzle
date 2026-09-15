impl Solution {
    pub fn find_number(hidden_number: &mut HiddenNumber) -> i32 {
        // A single-bit mask shares at most one bit with n, so the reply is
        // 0 or 1: positive means bit i of n itself is set.
        let mut number = 0;
        for bit in 0..30 {
            if hidden_number.common_set_bits(1 << bit) > 0 {
                number |= 1 << bit;
            }
        }
        number
    }
}
