impl Solution {
    pub fn percentage_letter(s: String, letter: String) -> i32 {
        // One pass counts the matches; multiplying before dividing keeps the
        // rounded-down percentage entirely in integer arithmetic.
        let bytes = s.as_bytes();
        let target = letter.as_bytes()[0];
        let mut count = 0_usize;
        for &byte in bytes {
            if byte == target {
                count += 1;
            }
        }
        (count * 100 / bytes.len()) as i32
    }
}
