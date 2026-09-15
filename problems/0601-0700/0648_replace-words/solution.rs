use std::collections::HashSet;

impl Solution {
    pub fn replace_words(dictionary: Vec<String>, sentence: String) -> String {
        // One set holds every root, so a prefix test is a single hash
        // lookup. No root is longer than 100 letters, so a word longer
        // than that can stop its scan early — prefixes past the cap could
        // not equal any root anyway.
        let roots: HashSet<&str> = dictionary.iter().map(|root| root.as_str()).collect();
        // Each derivative is replaced by its shortest matching root, and
        // the scan tries prefixes shortest first, so the first hit is the
        // answer; a word no root prefixes keeps itself.
        let mut replaced: Vec<&str> = Vec::new();
        for word in sentence.split(' ') {
            let limit = word.len().min(100);
            let mut replacement = word;
            for length in 1..=limit {
                let prefix = &word[..length];
                if roots.contains(prefix) {
                    replacement = prefix;
                    break;
                }
            }
            replaced.push(replacement);
        }
        replaced.join(" ")
    }
}
