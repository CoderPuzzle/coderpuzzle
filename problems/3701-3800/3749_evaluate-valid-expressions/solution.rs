impl Solution {
    // Intermediate values reach ~2^62, so the whole pipeline is 64-bit.
    pub fn evaluate_expression(expression: String) -> i64 {
        let bytes = expression.as_bytes();
        let mut pos = 0usize;
        Self::eval(bytes, &mut pos)
    }

    // One recursive descent covers the grammar; each call returns the value
    // and advances pos just past what it consumed.
    fn eval(e: &[u8], pos: &mut usize) -> i64 {
        let ch = e[*pos];
        // A digit or '-' starts a literal: optional sign, then digits.
        if ch == b'-' || ch.is_ascii_digit() {
            let mut j = *pos;
            if ch == b'-' {
                j += 1;
            }
            while j < e.len() && e[j].is_ascii_digit() {
                j += 1;
            }
            let v: i64 = std::str::from_utf8(&e[*pos..j]).unwrap().parse().unwrap();
            *pos = j;
            return v;
        }
        // Otherwise a three-letter operator; +=4 lands just past "op(".
        let op = &e[*pos..*pos + 3];
        *pos += 4;
        let a = Self::eval(e, pos);
        *pos += 1; // skip ","
        let b = Self::eval(e, pos);
        *pos += 1; // skip ")"
                   // Apply the operator to the two sub-results as the recursion unwinds.
        match op {
            b"add" => a + b,
            b"sub" => a - b,
            b"mul" => a * b,
            _ => a / b,
        }
    }
}
