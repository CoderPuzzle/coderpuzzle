use std::collections::HashMap;

impl Solution {
    pub fn find_original_array(mut changed: Vec<i32>) -> Vec<i32> {
        if changed.len() % 2 == 1 {
            return Vec::new();
        }

        changed.sort_unstable();
        let mut counts = HashMap::new();
        for &value in &changed {
            *counts.entry(value).or_insert(0) += 1;
        }

        let mut original = Vec::with_capacity(changed.len() / 2);
        for value in changed {
            let remaining = counts.get_mut(&value).unwrap();
            if *remaining == 0 {
                continue;
            }
            *remaining -= 1;
            let doubled_remaining = counts.entry(value * 2).or_insert(0);
            if *doubled_remaining == 0 {
                return Vec::new();
            }
            *doubled_remaining -= 1;
            original.push(value);
        }
        original
    }
}
