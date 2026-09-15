impl Solution {
    // Ternaries group right-to-left, so the subexpression closest to the
    // right end is always complete first. Scanning backwards therefore
    // meets every operand before the '?' that needs it.
    pub fn parse_ternary(expression: String) -> String {
        let bytes = expression.as_bytes();
        let mut stack: Vec<u8> = Vec::with_capacity(bytes.len());
        let mut i = bytes.len();
        while i > 0 {
            i -= 1;
            let c = bytes[i];
            if c != b'?' {
                stack.push(c);
            } else {
                let true_branch = stack.pop().unwrap();
                stack.pop(); // the ':' separating the two branches
                let false_branch = stack.pop().unwrap();
                // The character just left of the '?' is the condition ('T' or
                // 'F'); it belongs to this conditional, so consume it as well.
                let condition = bytes[i - 1];
                let chosen = if condition == b'T' { true_branch } else { false_branch };
                stack.push(chosen);
                i -= 1;
            }
        }
        (stack.last().copied().unwrap() as char).to_string()
    }
}
