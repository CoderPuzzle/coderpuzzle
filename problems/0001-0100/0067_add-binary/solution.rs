impl Solution {
    pub fn add_binary(a: String, b: String) -> String {
        // Walk both strings from their right ends, adding the way
        // pencil-and-paper binary addition does: one digit from each input
        // plus the carry in, one result digit and a new carry out.
        let (a, b) = (a.as_bytes(), b.as_bytes());
        let (mut i, mut j) = (a.len() as isize - 1, b.len() as isize - 1);
        let mut carry = 0u32;
        // The result has at most max(a.len(), b.len()) + 1 digits, which
        // a.len() + b.len() always covers.
        let mut digits = Vec::with_capacity(a.len() + b.len());
        // Running while either input has digits left or a carry is pending
        // absorbs both uneven lengths (the shorter input just stops
        // contributing, no padding) and the final carry ("11" + "1" =
        // "100") with no special cases after the loop.
        while i >= 0 || j >= 0 || carry > 0 {
            let mut total = carry;
            if i >= 0 {
                total += (a[i as usize] - b'0') as u32;
                i -= 1;
            }
            if j >= 0 {
                total += (b[j as usize] - b'0') as u32;
                j -= 1;
            }
            // total is at most 3 (1 + 1 + carry), so its low bit is the
            // result digit and the rest is the next carry. Only single
            // characters are ever converted, never the whole strings, which
            // is what the follow-up asks for.
            digits.push(b'0' + (total % 2) as u8);
            carry = total / 2;
        }
        // Digits were produced least-significant first; one reverse at the
        // end beats prepending each digit to the front.
        digits.reverse();
        String::from_utf8(digits).expect("binary digits are ASCII")
    }
}
