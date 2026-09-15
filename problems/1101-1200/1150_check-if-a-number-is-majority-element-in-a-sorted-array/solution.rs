impl Solution {
    pub fn is_majority_element(nums: Vec<i32>, target: i32) -> bool {
        // Sorted array: the target's occurrences form one contiguous run,
        // whose length is the distance between the two partition points.
        let low = nums.partition_point(|&v| v < target);
        let high = nums.partition_point(|&v| v <= target);
        2 * (high - low) > nums.len()
    }
}
