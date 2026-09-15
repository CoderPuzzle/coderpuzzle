impl Solution {
    pub fn num_steps(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut steps = 0;
        let mut carry = 0;
        // Consume bits from the least significant end. An even digit takes
        // one step (divide by two); an odd digit takes two (add one, then
        // divide). The carry records the overflow pushed left by adding 1.
        for i in (1..bytes.len()).rev() {
            let digit = (if bytes[i] == b'1' { 1 } else { 0 }) + carry;
            if digit % 2 == 0 {
                steps += 1;
                carry = digit / 2;
            } else {
                steps += 2;
                carry = (digit + 1) / 2;
            }
        }
        // Only the leading '1' is left; a pending carry makes it "10",
        // needing one final divide-by-two.
        steps + carry
    }
}
