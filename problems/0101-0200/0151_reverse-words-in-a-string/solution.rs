impl Solution {
    // String offers no in-place index writes, so the sweep runs on a char
    // vector — the honest equivalent of the in-place algorithm.
    pub fn reverse_words(s: String) -> String {
        let mut chars: Vec<char> = s.chars().collect();
        // Flip the whole text once: word order reverses, and every word's
        // letters come out backwards. The sweep below puts the letters back.
        chars.reverse();
        let n = chars.len();
        let mut write = 0;
        let mut read = 0;
        while read < n {
            // Skip the run of spaces before the next word.
            while read < n && chars[read] == ' ' {
                read += 1;
            }
            if read == n {
                break;
            }
            // One separating space between words, none before the first.
            if write > 0 {
                chars[write] = ' ';
                write += 1;
            }
            let start = write;
            while read < n && chars[read] != ' ' {
                chars[write] = chars[read];
                write += 1;
                read += 1;
            }
            // The word just copied still has its letters flipped; restore them.
            chars[start..write].reverse();
        }
        chars.truncate(write);
        chars.into_iter().collect()
    }
}
