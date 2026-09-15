impl Solution {
    pub fn calculate(s: String) -> i32 {
        // Only + and - appear, so the whole expression reduces to summing
        // signed terms: `result` is the running sum, `sign` the pending sign
        // of the next term, `num` the multi-digit number being assembled.
        let mut result: i64 = 0;
        let mut sign: i64 = 1;
        let mut num: i64 = 0;
        let mut stack: Vec<i64> = Vec::new();
        for ch in s.chars() {
            match ch {
                '0'..='9' => {
                    num = num * 10 + (ch as u8 - b'0') as i64;
                }
                '+' => {
                    // Fold the finished term in and record the next sign.
                    result += sign * num;
                    num = 0;
                    sign = 1;
                }
                '-' => {
                    // A leading '-' needs no special casing: it simply leaves
                    // sign = -1 for the next term or group.
                    result += sign * num;
                    num = 0;
                    sign = -1;
                }
                '(' => {
                    // Save the outer context and evaluate the group afresh.
                    stack.push(result);
                    stack.push(sign);
                    result = 0;
                    sign = 1;
                }
                ')' => {
                    result += sign * num;
                    num = 0;
                    // sign was pushed last, so it pops first: apply it to the
                    // inner value and add the saved outer result back.
                    let saved_sign = stack.pop().unwrap();
                    let saved_result = stack.pop().unwrap();
                    result = result * saved_sign + saved_result;
                }
                _ => {} // spaces are ignored
            }
        }
        // Fold in the final pending term.
        (result + sign * num) as i32
    }
}
