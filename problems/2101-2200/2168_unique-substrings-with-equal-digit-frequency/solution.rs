use std::collections::HashSet;

impl Solution {
    pub fn equal_digit_frequency(s: String) -> i32 {
        // For each start index, extend the substring one digit at a time while
        // tracking digit counts; the running (distinct digits, max frequency)
        // pair tests "every digit appears equally" in O(1) per extension.
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut seen: HashSet<String> = HashSet::new();
        for start in 0..n {
            let mut counts = [0i32; 10];
            let mut distinct = 0;
            let mut max_count = 0;
            let mut piece = String::new();
            for end in start..n {
                let digit = (bytes[end] - b'0') as usize;
                if counts[digit] == 0 {
                    distinct += 1;
                }
                counts[digit] += 1;
                max_count = max_count.max(counts[digit]);
                piece.push(bytes[end] as char);
                if max_count * distinct == (end - start + 1) as i32 {
                    seen.insert(piece.clone());
                }
            }
        }
        seen.len() as i32
    }
}
