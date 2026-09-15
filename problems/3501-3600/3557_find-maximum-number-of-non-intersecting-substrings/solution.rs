impl Solution {
    pub fn max_substrings(word: String) -> i32 {
        // Substrings may not share an index, so this is interval
        // scheduling: taking the earliest-finishing valid substring at
        // each step can never push a later choice further right. Scan
        // once, remember each letter's first index inside the current
        // window, and when the running index reaches 3 past it, take that
        // substring and restart the window just past its end.
        let mut first = [-1i32; 26];
        let mut count = 0i32;
        for (i, ch) in word.bytes().enumerate() {
            let c = (ch - b'a') as usize;
            let i = i as i32;
            if first[c] < 0 {
                first[c] = i;
            }
            if i - first[c] >= 3 {
                count += 1;
                first = [-1; 26];
            }
        }
        count
    }
}
