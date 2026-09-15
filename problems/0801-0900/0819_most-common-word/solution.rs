use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn most_common_word(paragraph: String, banned: Vec<String>) -> String {
        let banned_set: HashSet<&str> = banned.iter().map(String::as_str).collect();
        let mut counts: HashMap<String, i32> = HashMap::new();
        let mut best_word = String::new();
        let mut best_count = 0;
        // One-past-the-end reads as a space: it closes a word still open
        // when the paragraph ends, so the loop needs no separate flush.
        let bytes = paragraph.as_bytes();
        let mut word: Vec<u8> = Vec::new();
        for i in 0..=bytes.len() {
            let c = if i == bytes.len() { b' ' } else { bytes[i] };
            // ASCII puts every uppercase letter 32 codes above its
            // lowercase twin, so one range check + 32 folds the case;
            // every other character matches neither range and cuts the
            // word instead of joining it.
            if c >= b'A' && c <= b'Z' {
                word.push(c + 32);
            } else if c >= b'a' && c <= b'z' {
                word.push(c);
            } else if !word.is_empty() {
                // every byte passed a letter range check, so this unwrap
                // only rejects input the constraints already forbid
                let end = String::from_utf8(word).unwrap();
                word = Vec::new();
                if !banned_set.contains(end.as_str()) {
                    let count = counts.entry(end.clone()).or_insert(0);
                    *count += 1;
                    // Strictly greater keeps the earlier word on equal
                    // counts; the statement guarantees the answer is
                    // unique, so no tie ever reaches this comparison.
                    if *count > best_count {
                        best_count = *count;
                        best_word = end;
                    }
                }
            }
        }
        best_word
    }
}
