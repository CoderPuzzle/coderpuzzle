use std::collections::HashMap;

impl Solution {
    pub fn find_restaurant(list1: Vec<String>, list2: Vec<String>) -> Vec<String> {
        // The strings of each list are unique, so one map from a string to
        // its index in list1 settles every "where does it count from" query.
        let mut index_of: HashMap<&str, usize> = HashMap::with_capacity(list1.len());
        for (i, s) in list1.iter().enumerate() {
            index_of.insert(s.as_str(), i);
        }
        let mut best = 0;
        let mut result: Vec<String> = Vec::new();
        for (j, s) in list2.iter().enumerate() {
            if let Some(&i) = index_of.get(s.as_str()) {
                // A strictly smaller index sum restarts the winners at the new
                // minimum; an equal one extends the tie, so the winners come
                // out in the order they appear in list2.
                if result.is_empty() || i + j < best {
                    best = i + j;
                    result.clear();
                    result.push(s.clone());
                } else if i + j == best {
                    result.push(s.clone());
                }
            }
        }
        result
    }
}
