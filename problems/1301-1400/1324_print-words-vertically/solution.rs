impl Solution {
    pub fn print_vertically(s: String) -> Vec<String> {
        // Row k takes character k of every word in order; short words pad
        // with a space, and trailing spaces are trimmed off each row.
        let words: Vec<&str> = s.split(' ').collect();
        let height = words.iter().map(|w| w.len()).max().unwrap_or(0);
        let mut rows = Vec::with_capacity(height);
        for k in 0..height {
            let mut row = String::with_capacity(words.len());
            for word in &words {
                let bytes = word.as_bytes();
                if k < bytes.len() {
                    row.push(bytes[k] as char);
                } else {
                    row.push(' ');
                }
            }
            let trimmed = row.trim_end_matches(' ');
            rows.push(trimmed.to_string());
        }
        rows
    }
}
