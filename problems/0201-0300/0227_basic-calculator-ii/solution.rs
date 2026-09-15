impl Solution {
    pub fn calculate(s: String) -> i32 {
        let bytes = s.as_bytes();
        let last = bytes.len() - 1;
        // The expression is a plain sum of terms, each term a maximal chain
        // of */ : defer the additions and apply the operator that PRECEDED
        // the number just read, keeping fully evaluated terms on a stack.
        let mut stack: Vec<i64> = Vec::new();
        let mut num: i64 = 0;
        let mut op: u8 = b'+';
        for i in 0..=last {
            let ch = bytes[i];
            if ch.is_ascii_digit() {
                num = num * 10 + (ch - b'0') as i64;
            }
            // Two separate ifs: a digit in the last position must both extend
            // num and trigger the final flush (else-if would drop the term).
            if ch == b'+' || ch == b'-' || ch == b'*' || ch == b'/' || i == last {
                match op {
                    b'+' => stack.push(num),
                    b'-' => stack.push(-num),
                    // */ combines with the term currently on top.
                    b'*' => {
                        let top = stack.len() - 1;
                        stack[top] *= num;
                    }
                    _ => {
                        let top = stack.len() - 1;
                        stack[top] /= num;
                    }
                }
                op = ch;
                num = 0;
            }
        }
        // The answer is the sum of the deferred terms.
        stack.iter().sum::<i64>() as i32
    }
}
