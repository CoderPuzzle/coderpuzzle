use std::collections::HashMap;

// One hash entry per (prefix, suffix) pair, built once at construction:
// for each word, every prefix of the word is joined to every suffix
// through a '#' -- no word or query can contain it, since both are
// lowercase letters only -- and the entry holds the word's index.
// Processing words left to right makes later words overwrite earlier
// ones, so every entry ends up holding the largest matching index, and
// f() is a single lookup that answers -1 when the key is absent.
pub struct WordFilter {
    weights: HashMap<String, i32>,
}

impl WordFilter {
    pub fn new(words: Vec<String>) -> Self {
        let mut weights: HashMap<String, i32> = HashMap::new();
        for (index, word) in words.iter().enumerate() {
            for prefix in 0..=word.len() {
                for suffix in 0..=word.len() {
                    let mut key = String::with_capacity(word.len() + 1);
                    key.push_str(&word[..prefix]);
                    key.push('#');
                    key.push_str(&word[suffix..]);
                    weights.insert(key, index as i32);
                }
            }
        }
        WordFilter { weights }
    }

    pub fn f(&mut self, pref: String, suff: String) -> i32 {
        let mut key = String::with_capacity(pref.len() + suff.len() + 1);
        key.push_str(&pref);
        key.push('#');
        key.push_str(&suff);
        self.weights.get(&key).copied().unwrap_or(-1)
    }
}
