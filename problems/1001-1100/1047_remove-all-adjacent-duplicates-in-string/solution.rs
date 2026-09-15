impl Solution {
    pub fn remove_duplicates(s: String) -> String {
        let mut stack: Vec<u8> = Vec::with_capacity(s.len());
        for &ch in s.as_bytes() {
            if stack.last() == Some(&ch) {
                stack.pop();
            } else {
                stack.push(ch);
            }
        }
        String::from_utf8(stack).unwrap()
    }
}
