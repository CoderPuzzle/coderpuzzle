use std::collections::HashSet;

impl Solution {
    pub fn maximum_number_of_string_pairs(words: Vec<String>) -> i32 {
        // A word pairs only with its reversal among earlier words: look up
        // before inserting, so a word can never pair with itself. Distinct
        // strings make each candidate partner unique, so counting every hit
        // is optimal — palindromes can never find an earlier copy at all.
        let mut seen: HashSet<String> = HashSet::new();
        let mut pairs = 0;
        for word in &words {
            let reversed: String = word.chars().rev().collect();
            if seen.contains(&reversed) {
                pairs += 1;
            }
            seen.insert(word.clone());
        }
        pairs
    }
}
