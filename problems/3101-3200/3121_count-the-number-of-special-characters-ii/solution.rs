impl Solution {
    pub fn number_of_special_chars(word: String) -> i32 {
        // Special means every lowercase occurrence sits before the first
        // uppercase one, i.e. last-lower index < first-upper index; both
        // positions per letter are captured in a single pass.
        let mut first_upper = [-1_i32; 26];
        let mut last_lower = [-1_i32; 26];
        for (position, ch) in word.bytes().enumerate() {
            if ch >= b'a' {
                last_lower[(ch - b'a') as usize] = position as i32;
            } else if first_upper[(ch - b'A') as usize] == -1 {
                first_upper[(ch - b'A') as usize] = position as i32;
            }
        }
        (0..26)
            .filter(|&k| first_upper[k] != -1 && last_lower[k] != -1 && last_lower[k] < first_upper[k])
            .count() as i32
    }
}
