impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i64 {
        let mut total = 0i64;
        for i in 1..nums.len() {
            if nums[i - 1] > nums[i] {
                total += nums[i - 1] as i64 - nums[i] as i64;
            }
        }
        total
    }
}
