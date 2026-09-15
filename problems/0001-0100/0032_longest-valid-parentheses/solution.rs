impl Solution {
    pub fn longest_valid_parentheses(s: String) -> i32 {
        let s = s.as_bytes();
        // Stack of indices seeded with -1: a sentinel base marking the
        // position just before the current candidate stretch.
        let mut stack: Vec<i32> = Vec::with_capacity(s.len() + 1);
        stack.push(-1);
        let mut best = 0;
        for (i, &ch) in s.iter().enumerate() {
            // Every '(' index is pushed, so the stack holds the still-
            // unmatched openers in order, with the base beneath them.
            if ch == b'(' {
                stack.push(i as i32);
            } else {
                stack.pop();
                if stack.is_empty() {
                    // The pop emptied the stack: this ')' is unmatched and
                    // can never sit inside a valid substring, so its index
                    // becomes the new base, fencing off everything to its
                    // left.
                    stack.push(i as i32);
                } else {
                    // The popped index was the '(' matching this ')'. The top
                    // now names the closest barrier before the stretch ending
                    // here, so i - top is its full length; barriers only
                    // disappear by being matched, so "()()" measures 4, not 2.
                    let len = i as i32 - *stack.last().unwrap();
                    if len > best {
                        best = len;
                    }
                }
            }
        }
        best
    }
}
