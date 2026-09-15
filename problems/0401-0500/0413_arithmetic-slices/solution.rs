impl Solution {
    pub fn number_of_arithmetic_slices(nums: Vec<i32>) -> i32 {
        // Slices are counted by their right end: an element that keeps the
        // run arithmetic extends every slice ending one step earlier plus
        // adds a fresh length-3 one, so current steps up by one each time.
        let mut total = 0;
        let mut current = 0;
        for i in 2..nums.len() {
            if nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2] {
                current += 1;
                total += current;
            } else {
                // The run is broken; no slice crosses the new difference.
                current = 0;
            }
        }
        total
    }
}
