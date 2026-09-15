use std::collections::HashMap;

impl Solution {
    pub fn word_squares(words: Vec<String>) -> Vec<Vec<String>> {
        let mut by_first: HashMap<u8, Vec<String>> = HashMap::new();
        let mut by_last: HashMap<u8, Vec<String>> = HashMap::new();
        for word in &words {
            by_first.entry(word.as_bytes()[0]).or_default().push(word.clone());
            by_last.entry(word.as_bytes()[3]).or_default().push(word.clone());
        }
        let mut sorted = words.clone();
        sorted.sort();
        let empty: Vec<String> = Vec::new();
        let mut res: Vec<Vec<String>> = Vec::new();
        for top in &sorted {
            for left in by_first.get(&top.as_bytes()[0]).unwrap_or(&empty) {
                if left == top {
                    continue;
                }
                for right in by_first.get(&top.as_bytes()[3]).unwrap_or(&empty) {
                    if right == top || right == left {
                        continue;
                    }
                    for bottom in by_last.get(&right.as_bytes()[3]).unwrap_or(&empty) {
                        if bottom.as_bytes()[0] != left.as_bytes()[3] {
                            continue;
                        }
                        if bottom == top || bottom == left || bottom == right {
                            continue;
                        }
                        res.push(vec![top.clone(), left.clone(), right.clone(), bottom.clone()]);
                    }
                }
            }
        }
        res.sort();
        res
    }
}
