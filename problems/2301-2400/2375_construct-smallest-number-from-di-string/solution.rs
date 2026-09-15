impl Solution {
    pub fn smallest_number(pattern: String) -> String {
        let p = pattern.as_bytes();
        let n = p.len();
        let mut result = String::with_capacity(n + 1);
        let mut stack: Vec<u8> = Vec::with_capacity(n + 1);
        for i in 0..=n {
            // Push 1, 2, 3, ... while inside a 'D' run; the run's positions
            // get consecutive digits, the smallest possible pool.
            stack.push(b'1' + i as u8);
            // An 'I' (or the end) terminates the current 'D' block; popping
            // emits the block's digits in descending order, satisfying 'D'.
            if i == n || p[i] == b'I' {
                while let Some(c) = stack.pop() {
                    result.push(c as char);
                }
            }
        }
        result
    }
}
