impl Solution {
    pub fn longest_continuous_substring(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut best = 1;
        let mut run = 1;
        for i in 1..bytes.len() {
            run = if bytes[i] == bytes[i - 1] + 1 { run + 1 } else { 1 };
            if run > best {
                best = run;
            }
        }
        best
    }
}
