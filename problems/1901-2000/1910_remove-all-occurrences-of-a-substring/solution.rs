impl Solution {
    pub fn remove_occurrences(s: String, part: String) -> String {
        // Stream s through a survivor stack. A removal can only expose
        // characters at the top, so after each push the last part.len()
        // chars are checked and popped when they spell out part — the
        // freshly exposed top then gets its own chance on a later push.
        let (s, part) = (s.as_bytes(), part.as_bytes());
        let m = part.len();
        let mut stack: Vec<u8> = Vec::new();
        for &ch in s {
            stack.push(ch);
            if stack.len() >= m && stack[stack.len() - m..] == *part {
                stack.truncate(stack.len() - m);
            }
        }
        String::from_utf8(stack).unwrap()
    }
}
