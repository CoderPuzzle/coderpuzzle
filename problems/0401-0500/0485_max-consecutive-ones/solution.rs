impl Solution {
    pub fn find_max_consecutive_ones(nums: Vec<i32>) -> i32 {
        // One pass with a running count: a 1 extends the current run of
        // ones, a 0 ends it and resets the count to zero.
        let mut count = 0;
        let mut best = 0;
        for &value in &nums {
            if value == 1 {
                count += 1;
                // A run only reaches its full length at its last 1, so
                // tracking the best while it grows misses nothing.
                best = best.max(count);
            } else {
                count = 0;
            }
        }
        best
    }
}
