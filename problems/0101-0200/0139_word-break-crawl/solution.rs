use std::collections::HashSet;

impl Solution {
    pub fn word_break(s: String, wordDict: Vec<String>) -> bool {
        // Bottom-up DP over prefix reachability: reachable[i] says the first i
        // characters of s split into dictionary words. The empty prefix is
        // reachable, and the answer is reachable[s.len()].
        let words: HashSet<&str> = wordDict.iter().map(String::as_str).collect();
        let mut lengths: Vec<usize> = words.iter().map(|word| word.len()).collect();
        lengths.sort_unstable();
        lengths.dedup();
        let mut reachable = vec![false; s.len() + 1];
        reachable[0] = true;
        for i in 1..=s.len() {
            for &length in &lengths {
                if length > i {
                    break;
                }
                // Position i ends a word exactly when the prefix before it is
                // reachable and the slice ending here is a dictionary word.
                if reachable[i - length] && words.contains(&s[i - length..i]) {
                    reachable[i] = true;
                    break;
                }
            }
        }
        reachable[s.len()]
    }
}
