impl Solution {
    pub fn count_majority_subarrays(nums: Vec<i32>, target: i32) -> i64 {
        let mut total: i64 = 0;
        // Fix the left endpoint and grow the window one element at a time;
        // each step updates the running count of target in constant time.
        for start in 0..nums.len() {
            let mut count: i64 = 0;
            for end in start..nums.len() {
                if nums[end] == target {
                    count += 1;
                }
                // target is the majority exactly when it holds strictly
                // more than half of the window: twice its count beats
                // the length.
                if 2 * count > (end - start + 1) as i64 {
                    total += 1;
                }
            }
        }
        total
    }
}
