impl Solution {
    pub fn better_compression(compressed: String) -> String {
        let bytes = compressed.as_bytes();
        let mut counts = [0i32; 26];
        let mut i = 0usize;
        while i < bytes.len() {
            let letter = (bytes[i] - b'a') as usize;
            i += 1;
            let mut freq = 0i32;
            while i < bytes.len() && bytes[i].is_ascii_digit() {
                freq = freq * 10 + (bytes[i] - b'0') as i32;
                i += 1;
            }
            counts[letter] += freq;
        }
        let mut result = String::new();
        for letter in 0..26 {
            if counts[letter] > 0 {
                result.push((b'a' + letter as u8) as char);
                result.push_str(&counts[letter].to_string());
            }
        }
        result
    }
}
