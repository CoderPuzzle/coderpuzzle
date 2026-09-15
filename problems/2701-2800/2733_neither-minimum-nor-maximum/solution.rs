impl Solution {
    pub fn find_non_min_or_max(nums: Vec<i32>) -> i32 {
        if nums.len() < 3 {
            return -1;
        }
        let sum = nums[0] + nums[1] + nums[2];
        let lo = nums[0].min(nums[1]).min(nums[2]);
        let hi = nums[0].max(nums[1]).max(nums[2]);
        sum - lo - hi
    }
}
