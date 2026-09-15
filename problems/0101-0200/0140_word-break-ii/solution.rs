use std::collections::HashSet;

impl Solution {
    // A table of prefixes instead of recursion: dp[i] holds every sentence for
    // the prefix &s[..i], built by appending one last word to a sentence of a
    // shorter prefix. A prefix that cannot be segmented stays empty, so every
    // split hanging off it is pruned before any substring is cut.
    pub fn word_break(s: String, wordDict: Vec<String>) -> Vec<String> {
        let words: HashSet<&str> = wordDict.iter().map(|w| w.as_str()).collect();
        let s = s.as_str();
        let n = s.len();
        let mut dp: Vec<Vec<String>> = vec![Vec::new(); n + 1];
        // The empty prefix segments into exactly one sentence: the empty one.
        dp[0].push(String::new());
        for i in 1..=n {
            // The split j runs downward, so the candidate last word &s[j..i]
            // is one character long first and grows: sentences whose last word
            // is shorter come first, and among equal last words the sentences
            // of dp[j] keep their own order. That is exactly the order the
            // statement pins, emitted for free — no sorting pass at the end.
            for j in (0..i).rev() {
                if dp[j].is_empty() {
                    continue;
                }
                let last = &s[j..i];
                if !words.contains(last) {
                    continue;
                }
                if j == 0 {
                    dp[i].push(last.to_string());
                } else {
                    // The borrow checker cannot see that i != j, so the source
                    // row is cloned out before the destination row grows.
                    let heads = dp[j].clone();
                    for head in &heads {
                        dp[i].push(format!("{} {}", head, last));
                    }
                }
            }
        }
        dp[n].clone()
    }
}
