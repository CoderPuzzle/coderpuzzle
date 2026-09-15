use std::collections::HashMap;

impl Solution {
    pub fn divisible_triplet_count(nums: Vec<i32>, d: i32) -> i32 {
        // A triplet sum is divisible by d exactly when a middle element's
        // remainder completes the outer two: fix the left index L, sweep R
        // forward keeping remainder counts of the elements strictly between
        // them, and each lookup of the needed remainder counts every such
        // middle at once. Two-element sums exceed i32, so the remainder
        // arithmetic runs in i64.
        let d = d as i64;
        let nums: Vec<i64> = nums.into_iter().map(i64::from).collect();
        let mut count: i64 = 0;
        let n = nums.len();
        for i in 0..n {
            let mut between: HashMap<i64, i32> = HashMap::new();
            for j in i + 1..n {
                let rem = (nums[i] + nums[j]) % d;
                let need = (d - rem) % d;
                count += between.get(&need).copied().unwrap_or(0) as i64;
                *between.entry(nums[j] % d).or_insert(0) += 1;
            }
        }
        count as i32
    }
}
