use std::collections::HashMap;

impl Solution {
    pub fn kth_distinct(arr: Vec<String>, mut k: i32) -> String {
        let mut frequencies: HashMap<&str, i32> = HashMap::new();
        for word in &arr {
            *frequencies.entry(word.as_str()).or_insert(0) += 1;
        }
        for word in &arr {
            if frequencies[word.as_str()] == 1 {
                k -= 1;
                if k == 0 {
                    return word.clone();
                }
            }
        }
        String::new()
    }
}
