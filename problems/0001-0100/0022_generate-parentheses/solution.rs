impl Solution {
    pub fn generate_parenthesis(n: i32) -> Vec<String> {
        let mut result = Vec::new();
        let mut current = Vec::new();
        backtrack(n, &mut current, 0, 0, &mut result);
        result
    }
}

fn backtrack(n: i32, current: &mut Vec<u8>, open_count: i32, close_count: i32, result: &mut Vec<String>) {
    // Under the two guards below every leaf reached at length 2n is
    // well-formed by construction, so nothing needs re-validating.
    if current.len() == 2 * n as usize {
        // Freeze the shared path into an owned copy for the output.
        result.push(String::from_utf8(current.clone()).unwrap());
        return;
    }
    // Try '(' first ('(' < ')') so leaves emerge in lexicographic order; it
    // is allowed while fewer than n openings are placed.
    if open_count < n {
        // Push, recurse, pop: one shared buffer is the working storage for
        // the whole tree.
        current.push(b'(');
        backtrack(n, current, open_count + 1, close_count, result);
        current.pop();
    }
    // ')' only while closings still trail openings -- appending it can never
    // make the prefix invalid.
    if close_count < open_count {
        current.push(b')');
        backtrack(n, current, open_count, close_count + 1, result);
        current.pop();
    }
}
