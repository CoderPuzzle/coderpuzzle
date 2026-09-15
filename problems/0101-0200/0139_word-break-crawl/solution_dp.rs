use std::collections::HashSet;

impl Solution {
    pub fn word_break(s: String, wordDict: Vec<String>) -> bool {
        let s = s.as_bytes();
        let words: HashSet<&[u8]> = wordDict.iter().map(|word| word.as_bytes()).collect();
        let n = s.len();
        // reachable[i]: the prefix s[0..i) can be segmented; the empty prefix
        // is trivially segmentable.
        let mut reachable = vec![false; n + 1];
        reachable[0] = true;
        for i in 1..=n {
            // Any segmentation of s[0..i) ends with a last word s[j..i).
            for j in 0..i {
                if reachable[j] && words.contains(&s[j..i]) {
                    reachable[i] = true;
                    // Only feasibility matters, so stop at the first split.
                    break;
                }
            }
        }
        reachable[n]
    }
}
