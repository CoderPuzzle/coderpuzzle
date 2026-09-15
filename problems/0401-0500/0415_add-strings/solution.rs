impl Solution {
    // Schoolbook addition: walk both numbers from their right ends one
    // column at a time, add the two digits plus the carry, and emit
    // total % 10. The whole inputs are never converted to integers.
    pub fn add_strings(num1: String, num2: String) -> String {
        let (mut i, mut j, mut carry) = (num1.len(), num2.len(), 0u32);
        let mut digits = Vec::with_capacity(num1.len() + num2.len() + 1);
        // Looping on "carry > 0" appends the final leading 1 when the sum
        // is one digit longer; each side contributes only while in range.
        while i > 0 || j > 0 || carry > 0 {
            let mut total = carry;
            if i > 0 {
                i -= 1;
                total += (num1.as_bytes()[i] - b'0') as u32;
            }
            if j > 0 {
                j -= 1;
                total += (num2.as_bytes()[j] - b'0') as u32;
            }
            digits.push(b'0' + (total % 10) as u8);
            carry = total / 10;
        }
        // Digits came out least-significant first; reverse before
        // assembling the answer.
        digits.reverse();
        String::from_utf8(digits).expect("digit bytes")
    }
}
