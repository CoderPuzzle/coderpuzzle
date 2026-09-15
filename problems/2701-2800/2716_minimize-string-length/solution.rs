impl Solution {
    pub fn minimized_string_length(s: String) -> i32 {
        let mut seen = [false; 26];
        for ch in s.chars() {
            seen[(ch as u8 - b'a') as usize] = true;
        }
        let mut count = 0;
        for present in seen {
            if present {
                count += 1;
            }
        }
        count
    }
}
