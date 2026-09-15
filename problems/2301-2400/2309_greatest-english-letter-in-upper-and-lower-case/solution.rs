impl Solution {
    pub fn greatest_letter(s: String) -> String {
        // present[0..25] = lowercase seen, present[26..51] = uppercase seen.
        let mut present = [false; 52];
        for &byte in s.as_bytes() {
            if byte >= b'a' {
                present[(byte - b'a') as usize] = true;
            } else {
                present[26 + (byte - b'A') as usize] = true;
            }
        }
        for i in (0..26).rev() {
            if present[i] && present[26 + i] {
                return ((b'A' + i as u8) as char).to_string();
            }
        }
        String::new()
    }
}
