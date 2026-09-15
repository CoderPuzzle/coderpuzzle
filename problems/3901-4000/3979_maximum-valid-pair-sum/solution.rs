impl Solution {
    pub fn max_valid_pair_sum(nums: Vec<i32>, k: i32) -> i64 {
        let mut best_left = nums[0] as i64;
        let mut answer = i64::MIN;
        let k = k as usize;
        for j in k..nums.len() {
            best_left = best_left.max(nums[j - k] as i64);
            answer = answer.max(best_left + nums[j] as i64);
        }
        answer
    }
}
