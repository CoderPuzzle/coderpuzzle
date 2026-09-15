impl Solution {
    // A substring of base is exactly a run of consecutive alphabet letters,
    // and a run is pinned by its last letter plus its length — the
    // characters before any ending position are forced. So best[c] only
    // needs to track the longest run ending at letter c.
    pub fn find_substring_in_wrapround_string(s: String) -> i32 {
        let mut best = [0i32; 26];
        let mut run = 0i32;
        let bytes = s.as_bytes();
        for i in 0..bytes.len() {
            // The run continues when bytes[i] is the alphabet successor of
            // the previous letter, wrapping z -> a; otherwise restart at 1.
            if i > 0 && (bytes[i - 1] - b'a' + 1) % 26 == bytes[i] - b'a' {
                run += 1;
            } else {
                run = 1;
            }
            let j = (bytes[i] - b'a') as usize;
            if run > best[j] {
                best[j] = run;
            }
        }
        // A run of length L ending at c contributes exactly its L suffixes,
        // all runs, all distinct; the max per letter keeps each once.
        best.iter().sum()
    }
}
