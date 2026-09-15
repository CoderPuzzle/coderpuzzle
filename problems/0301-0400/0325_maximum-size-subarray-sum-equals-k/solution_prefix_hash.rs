use std::collections::HashMap;

impl Solution {
    pub fn max_sub_array_len(nums: Vec<i32>, k: i32) -> i32 {
        // first[prefix] = earliest index that prefix value occurred; the
        // seed 0: -1 lets a subarray starting at index 0 be found.
        let mut first: HashMap<i64, i32> = HashMap::new();
        first.insert(0, -1);
        let mut acc: i64 = 0;
        let mut best: i32 = 0;
        for (i, &x) in nums.iter().enumerate() {
            acc += x as i64;
            // Subarray (j, i] sums to k exactly when the earlier prefix
            // equals acc - k; earliest j gives the longest subarray.
            if let Some(&j) = first.get(&(acc - k as i64)) {
                if (i as i32 - j) > best {
                    best = i as i32 - j;
                }
            }
            // Keep only the first occurrence per prefix value — a later
            // duplicate would only shorten future subarrays.
            first.entry(acc).or_insert(i as i32);
        }
        best
    }
}
