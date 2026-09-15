impl Solution {
    pub fn build_and_evaluate(postfix: Vec<String>) -> i64 {
        let mut stack: Vec<i64> = Vec::with_capacity(postfix.len());
        for tok in &postfix {
            let bytes = tok.as_bytes();
            if bytes.len() == 1 && matches!(bytes[0], b'+' | b'-' | b'*' | b'/') {
                let b = stack.pop().unwrap();
                let a = stack.pop().unwrap();
                let value = match bytes[0] {
                    b'+' => a + b,
                    b'-' => a - b,
                    b'*' => a * b,
                    _ => a / b, // Rust's / truncates toward zero.
                };
                stack.push(value);
            } else {
                stack.push(tok.parse::<i64>().unwrap());
            }
        }
        stack.pop().unwrap()
    }
}
