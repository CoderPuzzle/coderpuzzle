impl Solution {
    pub fn are_occurrences_equal(s: String) -> bool {
        // Every present character must share one frequency, so the set of
        // the per-character counts has size one.
        let mut counts = [0usize; 26];
        for b in s.bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        let mut seen = std::collections::HashSet::new();
        for &c in counts.iter().filter(|&&c| c > 0) {
            seen.insert(c);
        }
        seen.len() == 1
    }
}
