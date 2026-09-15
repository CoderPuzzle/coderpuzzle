impl Solution {
    pub fn resulting_string(s: String) -> String {
        // Left-to-right stack: a fresh character cancels the top when the
        // two are circular-adjacent; the pair exposed by a pop is exactly
        // the next pair the leftmost-first rule would remove.
        let mut stack: Vec<u8> = Vec::with_capacity(s.len());
        for &ch in s.as_bytes() {
            if let Some(&top) = stack.last() {
                let diff = (top + 26 - ch) % 26;
                if diff == 1 || diff == 25 {
                    stack.pop();
                    continue;
                }
            }
            stack.push(ch);
        }
        String::from_utf8(stack).unwrap()
    }
}
