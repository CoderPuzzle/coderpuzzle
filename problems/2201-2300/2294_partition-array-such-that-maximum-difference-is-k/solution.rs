impl Solution {
    pub fn partition_array(nums: Vec<i32>, k: i32) -> i32 {
        let mut nums = nums;
        nums.sort_unstable();
        let mut groups = 1;
        let mut start = nums[0];
        for &value in nums.iter() {
            if value - start > k {
                groups += 1;
                start = value;
            }
        }
        groups
    }
}
