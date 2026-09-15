impl Solution {
    pub fn find_length_of_lcis(nums: Vec<i32>) -> i32 {
        // Single pass with a run counter: a strict rise extends the
        // increasing run under the cursor, anything else restarts it at 1.
        let mut run = 1;
        let mut best = 1;
        for i in 1..nums.len() {
            if nums[i] > nums[i - 1] {
                run += 1;
                // A run only reaches its full length at its last element,
                // so tracking the best while it grows misses nothing.
                best = best.max(run);
            } else {
                run = 1;
            }
        }
        best
    }
}
