impl Solution {
    pub fn string_hash(s: String, k: i32) -> String {
        // The chunks are the fixed windows of k bytes because n is a
        // multiple of k: each pass reads one window, adds up its characters'
        // alphabet indices, and appends the letter at index sum % 26. The
        // running total never exceeds 25 * 100 = 2500, so u32 suffices, and
        // one linear pass visits every byte exactly once.
        let bytes = s.as_bytes();
        let k = k as usize;
        let mut result = String::with_capacity(bytes.len() / k);
        for chunk in bytes.chunks(k) {
            let total: u32 = chunk.iter().map(|&b| (b - b'a') as u32).sum();
            result.push((b'a' + (total % 26) as u8) as char);
        }
        result
    }
}
