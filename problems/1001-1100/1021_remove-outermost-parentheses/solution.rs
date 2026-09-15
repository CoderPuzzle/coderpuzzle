impl Solution {
    pub fn remove_outer_parentheses(s: String) -> String {
        let mut result = String::new();
        let mut depth = 0i32;
        for ch in s.chars() {
            if ch == '(' {
                // Keep it only if some other primitive block is already
                // open; an outermost '(' opens at depth 0 and is dropped.
                if depth > 0 {
                    result.push(ch);
                }
                depth += 1;
            } else {
                // Close the block first, then keep the character only if
                // it did not just bring the depth back to 0.
                depth -= 1;
                if depth > 0 {
                    result.push(ch);
                }
            }
        }
        result
    }
}
