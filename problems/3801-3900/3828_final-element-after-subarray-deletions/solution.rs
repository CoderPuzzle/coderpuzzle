impl Solution {
    // Alice can end the game with her opening move: deleting the
    // contiguous block of length n - 1 that spares one endpoint is
    // always legal (n - 1 < n), so she secures the larger endpoint.
    // No other opening does better: one deletion leaves a prefix plus
    // a suffix of nums, so an end of the remainder is still an
    // original endpoint, and Bob can then end the game at the smaller
    // end of what remains.
    pub fn final_element(nums: Vec<i32>) -> i32 {
        nums[0].max(nums[nums.len() - 1])
    }
}
