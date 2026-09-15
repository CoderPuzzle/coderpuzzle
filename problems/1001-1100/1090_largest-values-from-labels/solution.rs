use std::collections::HashMap;

impl Solution {
    pub fn largest_vals_from_labels(values: Vec<i32>, labels: Vec<i32>, num_wanted: i32, use_limit: i32) -> i32 {
        // Greedy: sort items by value descending and take each one while
        // both the per-label cap and the total count allow it.
        let mut items: Vec<(i32, i32)> = values.into_iter().zip(labels).collect();
        items.sort_unstable_by(|a, b| b.0.cmp(&a.0));
        let mut used: HashMap<i32, i32> = HashMap::new();
        let mut total = 0;
        let mut taken = 0;
        for (value, label) in items {
            if taken == num_wanted {
                break;
            }
            if used.get(&label).copied().unwrap_or(0) == use_limit {
                continue;
            }
            *used.entry(label).or_insert(0) += 1;
            total += value;
            taken += 1;
        }
        total
    }
}
