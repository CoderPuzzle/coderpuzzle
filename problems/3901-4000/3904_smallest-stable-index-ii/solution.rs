impl Solution {
    pub fn first_stable_index(nums: Vec<i32>, k: i32) -> i32 {
        let mut suffix_min = nums.clone();
        for i in (0..nums.len() - 1).rev() {
            suffix_min[i] = nums[i].min(suffix_min[i + 1]);
        }

        let mut prefix_max = nums[0];
        for (i, &value) in nums.iter().enumerate() {
            prefix_max = prefix_max.max(value);
            if prefix_max - suffix_min[i] <= k {
                return i as i32;
            }
        }
        -1
    }
}
