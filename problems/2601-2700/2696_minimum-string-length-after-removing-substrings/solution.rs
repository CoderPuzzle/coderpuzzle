impl Solution {
    pub fn min_length(s: String) -> i32 {
        let mut stack: Vec<char> = Vec::new();
        for ch in s.chars() {
            let pair = match stack.last() {
                Some('A') if ch == 'B' => true,
                Some('C') if ch == 'D' => true,
                _ => false,
            };
            if pair {
                stack.pop();
            } else {
                stack.push(ch);
            }
        }
        stack.len() as i32
    }
}
