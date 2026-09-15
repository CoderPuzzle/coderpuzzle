use std::collections::HashMap;

impl Solution {
    pub fn min_set_size(arr: Vec<i32>) -> i32 {
        // A k-value set removes the sum of k frequencies; accumulate the
        // largest frequencies first until half the array is gone.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for value in &arr {
            *counts.entry(*value).or_insert(0) += 1;
        }
        let mut freqs: Vec<i32> = counts.into_values().collect();
        freqs.sort_unstable_by(|a, b| b.cmp(a));
        let need = (arr.len() as i32 + 1) / 2;
        let mut removed = 0;
        for (index, freq) in freqs.iter().enumerate() {
            removed += freq;
            if removed >= need {
                return index as i32 + 1;
            }
        }
        freqs.len() as i32
    }
}
