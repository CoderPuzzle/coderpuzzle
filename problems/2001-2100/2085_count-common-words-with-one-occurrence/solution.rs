use std::collections::HashMap;

impl Solution {
    pub fn count_words(words1: Vec<String>, words2: Vec<String>) -> i32 {
        let mut first: HashMap<String, i32> = HashMap::new();
        let mut second: HashMap<String, i32> = HashMap::new();
        for word in words1 {
            *first.entry(word).or_default() += 1;
        }
        for word in words2 {
            *second.entry(word).or_default() += 1;
        }
        first
            .iter()
            .filter(|(word, frequency)| **frequency == 1 && second.get(*word) == Some(&1))
            .count() as i32
    }
}
