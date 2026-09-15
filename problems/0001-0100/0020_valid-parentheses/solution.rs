impl Solution {
    pub fn is_valid(s: String) -> bool {
        let mut stack: Vec<char> = Vec::new();
        for ch in s.chars() {
            match ch {
                // Openers are pushed: the most recently opened bracket is
                // always the one that must close next -- a LIFO discipline
                // the stack models directly.
                '(' | '[' | '{' => stack.push(ch),
                ')' | ']' | '}' => {
                    // Map the closer to the opener it requires.
                    let open = match ch {
                        ')' => '(',
                        ']' => '[',
                        _ => '{',
                    };
                    // pop() on an empty stack yields None, so this one
                    // comparison rejects both an unmatched closer and a top
                    // that is not the required opener.
                    if stack.pop() != Some(open) {
                        return false;
                    }
                }
                _ => return false,
            }
        }
        // Valid exactly when nothing is left open; catches inputs like "(((".
        stack.is_empty()
    }
}
