use std::collections::HashMap;

impl Solution {
    pub fn num_identical_pairs(nums: Vec<i32>) -> i64 {
        // For each value, the k-th time it is seen forms a good pair with
        // each of the k - 1 occurrences already counted, so adding the
        // running count before bumping it reproduces C(count, 2) per value.
        let mut seen: HashMap<i32, i64> = HashMap::new();
        let mut total = 0i64;
        for num in nums {
            let count = seen.entry(num).or_insert(0);
            total += *count;
            *count += 1;
        }
        total
    }
}
