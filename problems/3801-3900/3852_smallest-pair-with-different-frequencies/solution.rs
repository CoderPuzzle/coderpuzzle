use std::collections::HashMap;

impl Solution {
    // Values and frequencies are at most 100, so i32 arithmetic carries
    // everything without overflow.
    pub fn min_distinct_freq_pair(nums: Vec<i32>) -> Vec<i32> {
        let mut freq: HashMap<i32, i32> = HashMap::new();
        for &x in &nums {
            *freq.entry(x).or_insert(0) += 1;
        }
        let mut values: Vec<i32> = freq.keys().copied().collect();
        values.sort_unstable();
        // If any valid pair exists, its x is always the smallest distinct
        // value: if every larger value shared freq[x], all of nums would
        // share one frequency and no pair could differ. So one scan past
        // values[0] finds the smallest qualifying y.
        let x = values[0];
        for &y in &values {
            if y > x && freq[&y] != freq[&x] {
                return vec![x, y];
            }
        }
        vec![-1, -1]
    }
}
