impl Solution {
    pub fn find_repeated_dna_sequences(s: String) -> Vec<String> {
        let bytes = s.as_bytes();
        let mut seen: std::collections::HashSet<&str> = std::collections::HashSet::new();
        // A second set collects each repeated window exactly once, even when
        // it occurs three or more times.
        let mut repeated: std::collections::HashSet<&str> = std::collections::HashSet::new();
        // Slide a fixed 10-letter window; the loop bound yields no full
        // window (hence an empty result) for strings shorter than 10.
        let mut i = 0;
        while i + 10 <= bytes.len() {
            let seq = &s[i..i + 10];
            // insert() returns false when the window was already seen, i.e.
            // it occurs at least twice.
            if !seen.insert(seq) {
                repeated.insert(seq);
            }
            i += 1;
        }
        // Sorted output for a deterministic order.
        let mut result: Vec<String> = repeated.into_iter().map(|x| x.to_string()).collect();
        result.sort();
        result
    }
}
