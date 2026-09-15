impl Solution {
    // Augment with '1' at both ends, then run-length encode the result. A
    // trade turns an internal '1'-run (one '0'-run on each side) plus both
    // flanking '0'-runs into '1's, gaining their combined length.
    pub fn max_active_sections_after_trade(s: String) -> i32 {
        let t = format!("1{}1", s);
        let total = s.bytes().filter(|&b| b == b'1').count() as i32;
        let bytes = t.as_bytes();
        let mut runs = Vec::new();
        let mut i = 0;
        while i < bytes.len() {
            let mut j = i;
            while j < bytes.len() && bytes[j] == bytes[i] {
                j += 1;
            }
            runs.push((j - i) as i32);
            i = j;
        }
        // Runs alternate starting with '1', so the internal '1'-runs sit at
        // even indices 2, 4, ..., runs.len() - 3 with a '0'-run on each side.
        let mut best = 0;
        let mut k = 2;
        while k + 2 < runs.len() {
            best = best.max(runs[k - 1] + runs[k + 1]);
            k += 2;
        }
        total + best
    }
}
