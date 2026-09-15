use std::collections::HashMap;

impl Solution {
    pub fn max_frequency(mut nums: Vec<i32>, k: i32, num_operations: i32) -> i32 {
        // A target v collects every element in [v-k, v+k]: elements already
        // equal to v cost nothing, any other costs one operation, and
        // surplus operations can always be spent as +0 elsewhere because
        // num_operations <= n. So the best frequency at v is
        // min(window(v), count(v) + num_operations). Elements are >= 1, so
        // targets below 1 never beat v = 1, and targets above max+k see an
        // empty window; a sliding window over every integer v in
        // [1, max(nums)+k] therefore evaluates all candidates.
        nums.sort_unstable();
        let mut count: HashMap<i32, i32> = HashMap::new();
        for &x in &nums {
            *count.entry(x).or_insert(0) += 1;
        }
        let n = nums.len();
        let mut best = 0;
        let mut lo = 0_usize;
        let mut hi = 0_usize;
        for v in 1..=(nums[n - 1] + k) as i64 {
            while hi < n && (nums[hi] as i64) <= v + k as i64 {
                hi += 1;
            }
            while lo < hi && (nums[lo] as i64) < v - k as i64 {
                lo += 1;
            }
            let exact = count.get(&(v as i32)).copied().unwrap_or(0);
            best = best.max((hi - lo).min(exact as usize + num_operations as usize));
        }
        best as i32
    }
}
