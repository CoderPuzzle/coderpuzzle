use std::collections::HashMap;

impl Solution {
    pub fn words_abbreviation(words: Vec<String>) -> Vec<String> {
        // Every word starts at a one-letter prefix: first character, count of
        // the middle, last character. Abbreviations can only clash between
        // equal-length words sharing that prefix and their last letter, and
        // the cure is collective — every clashing group grows its prefix by
        // one and re-groups, until each abbreviation stands alone.
        let n = words.len();
        let mut prefix = vec![1usize; n];
        loop {
            let mut groups: HashMap<String, Vec<usize>> = HashMap::new();
            for i in 0..n {
                let key = Self::abbreviate(&words[i], prefix[i]);
                groups.entry(key).or_default().push(i);
            }
            let mut unique = true;
            for ids in groups.values() {
                if ids.len() > 1 {
                    unique = false;
                    for &i in ids {
                        prefix[i] += 1;
                    }
                }
            }
            if unique {
                break;
            }
        }
        let mut result = Vec::with_capacity(n);
        for i in 0..n {
            let abbr = Self::abbreviate(&words[i], prefix[i]);
            // An abbreviation no shorter than the word itself buys nothing.
            if abbr.len() < words[i].len() {
                result.push(abbr);
            } else {
                result.push(words[i].clone());
            }
        }
        result
    }

    fn abbreviate(word: &str, p: usize) -> String {
        let count = word.len() - p - 1;
        let mut abbreviation = String::with_capacity(p + 8);
        abbreviation.push_str(&word[..p]);
        abbreviation.push_str(&count.to_string());
        abbreviation.push(word.as_bytes()[word.len() - 1] as char);
        abbreviation
    }
}
