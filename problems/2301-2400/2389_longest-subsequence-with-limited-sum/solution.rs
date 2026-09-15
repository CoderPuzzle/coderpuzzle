impl Solution {
    // The longest subsequence under a sum cap uses the smallest
    // elements: sort, prefix-sum, then count prefixes <= query by
    // binary search (first index whose prefix exceeds the query).
    pub fn answer_queries(nums: Vec<i32>, queries: Vec<i32>) -> Vec<i32> {
        let mut nums = nums;
        nums.sort_unstable();
        for i in 1..nums.len() {
            nums[i] += nums[i - 1];
        }
        queries
            .iter()
            .map(|&q| nums.partition_point(|&p| p <= q) as i32)
            .collect()
    }
}
