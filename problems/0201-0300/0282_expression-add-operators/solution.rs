impl Solution {
    pub fn add_operators(num: String, target: i32) -> Vec<String> {
        let bytes = num.as_bytes();
        let n = bytes.len();
        let target = target as i64;
        let mut results: Vec<String> = Vec::new();
        let mut expression = String::new();

        // num.len() <= 10, so every operand is < 1e10 and any run of '*'
        // operands stays under ~1e10; the running total never exceeds ~1e11,
        // which fits comfortably in an i64.
        // current is the expression's value so far; prev is the trailing
        // multiplicand chain that a later '*' binds to, not all of current.
        // The very first operand seeds both.
        fn dfs(
            bytes: &[u8],
            n: usize,
            target: i64,
            index: usize,
            prev: i64,
            current: i64,
            expression: &mut String,
            results: &mut Vec<String>,
        ) {
            if index == n {
                // The evaluation travels with the search: one comparison.
                if current == target {
                    results.push(expression.clone());
                }
                return;
            }
            let mut nxt: i64 = 0;
            // Each gap decides how far the operand extends, then the operator.
            for end in index..n {
                // A '0' at bytes[index] admits only the single-digit operand
                // 0 (lone 0 legal, 01 not), so stop extending.
                if end != index && bytes[index] == b'0' {
                    break;
                }
                nxt = nxt * 10 + (bytes[end] - b'0') as i64;
                let length_before = expression.len();
                if index == 0 {
                    // The first operand seeds both the running total and
                    // the trailing multiplicand chain.
                    expression.push_str(&nxt.to_string());
                    dfs(bytes, n, target, end + 1, nxt, nxt, expression, results);
                } else {
                    // '+'/'-' fold nxt straight into current; the chain
                    // resets to nxt (or -nxt so a later '*' reverses the
                    // subtraction).
                    expression.push('+');
                    expression.push_str(&nxt.to_string());
                    dfs(bytes, n, target, end + 1, nxt, current + nxt, expression, results);
                    expression.truncate(length_before);
                    expression.push('-');
                    expression.push_str(&nxt.to_string());
                    dfs(bytes, n, target, end + 1, -nxt, current - nxt, expression, results);
                    expression.truncate(length_before);
                    // '*' rewrites the tail in place: drop the chain's old
                    // contribution, add prev * nxt.
                    expression.push('*');
                    expression.push_str(&nxt.to_string());
                    dfs(
                        bytes,
                        n,
                        target,
                        end + 1,
                        prev * nxt,
                        current - prev + prev * nxt,
                        expression,
                        results,
                    );
                }
                expression.truncate(length_before);
            }
        }

        dfs(bytes, n, target, 0, 0, 0, &mut expression, &mut results);
        results
    }
}
