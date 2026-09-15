impl Solution {
    pub fn clear_digits(s: String) -> String {
        // Survivors so far form a stack; a digit always removes the
        // closest non-digit still standing to its left, which is exactly
        // its top.
        let mut kept: Vec<u8> = Vec::with_capacity(s.len());
        for &b in s.as_bytes() {
            if b.is_ascii_digit() {
                kept.pop();
            } else {
                kept.push(b);
            }
        }
        String::from_utf8(kept).unwrap()
    }
}
