impl Solution {
    pub fn score_of_a_string(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut total = 0;
        for i in 1..bytes.len() {
            total += (bytes[i] as i32 - bytes[i - 1] as i32).abs();
        }
        total
    }
}
