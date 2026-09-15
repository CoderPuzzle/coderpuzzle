impl Solution {
    pub fn longest_subsequence(s: String, k: i32) -> i32 {
        // k <= 1e9 < 2^30, so a cost of 1 << length never fits once
        // length reaches 30; the cap keeps the shift small.
        let mut value: i64 = 0;
        let mut length: i32 = 0;
        for byte in s.as_bytes().iter().rev() {
            if *byte == b'0' {
                length += 1;
            } else if length < 30 && value + (1_i64 << length) <= k as i64 {
                value += 1_i64 << length;
                length += 1;
            }
        }
        length
    }
}
