use std::collections::HashSet;

impl Solution {
    pub fn report_spam(message: Vec<String>, banned_words: Vec<String>) -> bool {
        // A word is banned or it is not: collapse bannedWords into a hash set
        // (internal duplicates collapse harmlessly). Scan the message counting
        // every occurrence that lands in the set — the same banned word twice
        // in the message counts twice — and stop as soon as two matches have
        // been seen; on a 10^5-word message the early exit can skip the rest.
        let banned: HashSet<&str> = banned_words.iter().map(|w| w.as_str()).collect();
        let mut count = 0;
        for word in &message {
            if banned.contains(word.as_str()) {
                count += 1;
                if count == 2 {
                    return true;
                }
            }
        }
        false
    }
}
