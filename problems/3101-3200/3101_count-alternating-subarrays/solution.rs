impl Solution {
    pub fn count_alternating_subarrays(nums: Vec<i32>) -> i64 {
        // The answer reaches n * (n + 1) / 2 = 5,000,050,000 at the
        // bounds, past what an i32 can hold, so accumulate in i64.
        let mut count: i64 = 0;
        let mut current: i64 = 0;
        for index in 0..nums.len() {
            if index > 0 && nums[index] == nums[index - 1] {
                current = 1;
            } else {
                current += 1;
            }
            count += current;
        }
        count
    }
}
