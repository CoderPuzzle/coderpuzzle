impl Solution {
    pub fn repeated_character(s: String) -> String {
        // The first letter to appear twice is exactly the first letter
        // whose second occurrence shows up, so one left-to-right scan with
        // a seen table ends the moment a repeat is met.
        let mut seen = [false; 26];
        for &byte in s.as_bytes() {
            let index = (byte - b'a') as usize;
            if seen[index] {
                return (byte as char).to_string();
            }
            seen[index] = true;
        }
        String::new()
    }
}
