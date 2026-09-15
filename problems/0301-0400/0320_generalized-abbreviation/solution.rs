impl Solution {
    // Each position doubles the possibilities: fold the character into the
    // running count, or keep the letter and flush the count first. The
    // abbreviate branch is tried first, so the results come out in the
    // canonical order the statement pins.
    pub fn generate_abbreviations(word: String) -> Vec<String> {
        let mut results: Vec<String> = Vec::with_capacity(1 << word.len());
        Self::walk(word.as_bytes(), 0, String::new(), 0, &mut results);
        results
    }

    fn walk(word: &[u8], pos: usize, prefix: String, count: u32, results: &mut Vec<String>) {
        if pos == word.len() {
            // The end of the word flushes whatever count is still pending.
            let mut finished = prefix;
            if count > 0 {
                finished.push_str(&count.to_string());
            }
            results.push(finished);
            return;
        }
        // Abbreviate: extend the running count.
        Self::walk(word, pos + 1, prefix.clone(), count + 1, results);
        // Keep: flush the pending count, then the letter.
        let mut kept = prefix;
        if count > 0 {
            kept.push_str(&count.to_string());
        }
        kept.push(word[pos] as char);
        Self::walk(word, pos + 1, kept, 0, results);
    }
}
