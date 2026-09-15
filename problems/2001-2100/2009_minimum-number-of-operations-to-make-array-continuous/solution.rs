impl Solution {
    pub fn min_operations(mut nums: Vec<i32>) -> i32 {
        let length = nums.len();
        nums.sort_unstable();
        nums.dedup();

        let mut left = 0usize;
        let mut kept = 0usize;
        for right in 0..nums.len() {
            while nums[right] as i64 - nums[left] as i64 >= length as i64 {
                left += 1;
            }
            kept = kept.max(right - left + 1);
        }

        (length - kept) as i32
    }
}
