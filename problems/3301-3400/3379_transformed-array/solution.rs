impl Solution {
    pub fn construct_transformed_array(nums: Vec<i32>) -> Vec<i32> {
        // Each entry is independent: land |nums[i]| steps from i in the
        // direction of its sign. The one-shot landing index
        // ((i + nums[i]) % n + n) % n folds leftward (negative) offsets back
        // into range; a step of zero stays on i, matching the nums[i] == 0
        // rule without a special case.
        let n = nums.len() as i32;
        (0..nums.len())
            .map(|i| {
                let i = i as i32;
                nums[(((i + nums[i as usize]) % n + n) % n) as usize]
            })
            .collect()
    }
}
