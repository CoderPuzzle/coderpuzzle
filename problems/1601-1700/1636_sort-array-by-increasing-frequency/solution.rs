use std::collections::HashMap;

impl Solution {
    pub fn frequency_sort(nums: Vec<i32>) -> Vec<i32> {
        // Count each value's frequency, then sort a copy by a composite
        // key: frequency ascending, value descending on ties.
        let mut freq: HashMap<i32, i32> = HashMap::new();
        for &value in &nums {
            *freq.entry(value).or_insert(0) += 1;
        }

        let mut result = nums.clone();
        result.sort_by(|a, b| freq[a].cmp(&freq[b]).then_with(|| b.cmp(a)));
        result
    }
}
