impl Solution {
    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        // Kadane's algorithm: current is the best sum of a subarray ending
        // exactly here; the answer is its maximum over all indices.
        // Seeding with nums[0] (not 0) makes all-negative inputs come out
        // right: an empty-prefix 0 must not be allowed to win.
        let mut best = nums[0];
        let mut current = nums[0];
        for &value in &nums[1..] {
            // Extend the best subarray ending at the previous index, or start
            // fresh: a negative running sum can only drag down what follows.
            current = if current < 0 { value } else { current + value };
            if current > best {
                best = current;
            }
        }
        best
    }
}
