use std::collections::{HashMap, HashSet};

// One abbreviation group per abbreviation, held as a set of words;
// isUnique applies the two-condition rule directly: the group for the
// query's abbreviation must be empty, or contain nothing but the query
// itself.
pub struct ValidWordAbbr {
    groups: HashMap<String, HashSet<String>>,
}

// Words are lowercase ASCII by the constraints, so byte indexing is safe.
fn abbrev(word: &str) -> String {
    // First letter + count of the letters between + last letter; a word
    // of one or two characters is an abbreviation of itself.
    if word.len() <= 2 {
        return word.to_string();
    }
    let first = &word[..1];
    let last = &word[word.len() - 1..];
    format!("{}{}{}", first, word.len() - 2, last)
}

impl ValidWordAbbr {
    pub fn new(dictionary: Vec<String>) -> Self {
        // A set per abbreviation: listing "deer" twice must leave the
        // group {"deer"} — a word never collides with its own duplicates.
        let mut groups: HashMap<String, HashSet<String>> = HashMap::new();
        for word in dictionary.iter() {
            groups.entry(abbrev(word)).or_default().insert(word.clone());
        }
        ValidWordAbbr { groups }
    }

    pub fn isUnique(&mut self, word: String) -> bool {
        // No word with this abbreviation, or every such word is `word`.
        match self.groups.get(&abbrev(&word)) {
            None => true,
            Some(group) => group.len() == 1 && group.contains(&word),
        }
    }
}
