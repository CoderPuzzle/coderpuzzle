impl Solution {
    pub fn eval_rpn(tokens: Vec<String>) -> i32 {
        // Stack machine: operands wait on the stack until an operator arrives,
        // pops its two operands -- the second pop is the left one -- and pushes
        // the result of applying itself.
        let mut stack: Vec<i64> = Vec::with_capacity(tokens.len() / 2 + 1);
        for token in &tokens {
            let result = match token.as_str() {
                "+" | "-" | "*" | "/" => {
                    let b = stack.pop().unwrap();
                    let a = stack.pop().unwrap();
                    match token.as_str() {
                        "+" => a + b,
                        "-" => a - b,
                        "*" => a * b,
                        // Rust's integer division already truncates toward zero.
                        _ => a / b,
                    }
                }
                _ => token.parse::<i64>().unwrap(),
            };
            stack.push(result);
        }
        stack[0] as i32
    }
}
