impl Solution {
    pub fn max_power(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut best = 1;
        let mut current = 1;
        for i in 1..bytes.len() {
            if bytes[i] == bytes[i - 1] {
                current += 1;
                best = best.max(current);
            } else {
                current = 1;
            }
        }
        best
    }
}
