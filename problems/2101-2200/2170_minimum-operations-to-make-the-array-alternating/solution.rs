use std::collections::HashMap;

impl Solution {
    pub fn minimum_operations(nums: Vec<i32>) -> i32 {
        // An alternating array is fixed by one value for even indices and one
        // different value for odd indices, so the kept elements are exactly
        // the most frequent value on each side. Count both parities in one
        // pass, then keep the best of the four top-1/top-2 combinations.
        let n = nums.len() as i32;
        if n == 1 {
            return 0;
        }
        let mut even_counts: HashMap<i32, i32> = HashMap::new();
        let mut odd_counts: HashMap<i32, i32> = HashMap::new();
        for (index, value) in nums.iter().enumerate() {
            let counts = if index % 2 == 0 {
                &mut even_counts
            } else {
                &mut odd_counts
            };
            *counts.entry(*value).or_insert(0) += 1;
        }
        // Top values per parity plus a fresh fill value worth nothing: the
        // optimal partner need not occur anywhere in nums.
        let fresh_value = *nums.iter().max().unwrap() + 1;
        let candidates = |counts: &HashMap<i32, i32>| -> Vec<(i32, i32)> {
            let mut ranked: Vec<(i32, i32)> = counts.iter().map(|(&value, &count)| (count, value)).collect();
            ranked.sort_unstable_by(|a, b| b.0.cmp(&a.0));
            ranked.truncate(2);
            ranked.push((0, fresh_value));
            ranked
        };
        let mut best = n;
        for (even_kept, even_value) in candidates(&even_counts) {
            for (odd_kept, odd_value) in candidates(&odd_counts) {
                if even_value == odd_value {
                    continue;
                }
                best = best.min(n - even_kept - odd_kept);
            }
        }
        best
    }
}
