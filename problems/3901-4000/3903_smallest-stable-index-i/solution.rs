impl Solution {
    pub fn first_stable_index(nums: Vec<i32>, k: i32) -> i32 {
        for i in 0..nums.len() {
            let mut prefix_max = nums[0];
            for &value in &nums[..=i] {
                prefix_max = prefix_max.max(value);
            }

            let mut suffix_min = nums[i];
            for &value in &nums[i + 1..] {
                suffix_min = suffix_min.min(value);
            }

            if prefix_max - suffix_min <= k {
                return i as i32;
            }
        }
        -1
    }
}
