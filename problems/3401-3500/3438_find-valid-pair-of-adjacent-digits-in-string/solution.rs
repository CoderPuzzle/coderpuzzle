impl Solution {
    // A digit's validity never depends on where it sits, only on how often
    // it occurs in the whole string, so one counting pass settles every
    // question the scan will ask.
    pub fn find_valid_pair(s: String) -> String {
        let bytes = s.as_bytes();
        let mut counts = [0u32; 10];
        for &b in bytes {
            counts[(b - b'0') as usize] += 1;
        }
        for i in 0..bytes.len() - 1 {
            let a = (bytes[i] - b'0') as usize;
            let b = (bytes[i + 1] - b'0') as usize;
            // Valid when the digits differ and each occurs exactly as many
            // times as its numeric value.
            if a != b && counts[a] == a as u32 && counts[b] == b as u32 {
                return s[i..i + 2].to_string();
            }
        }
        String::new()
    }
}
