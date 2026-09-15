impl Solution {
    pub fn maximum_count(nums: Vec<i32>) -> i32 {
        // The statement defines the answer outright: neg counts the entries
        // below zero, pos counts the entries above zero, and zeros join
        // neither camp. One walk over nums tallies both counts.
        let mut neg = 0;
        let mut pos = 0;
        for &value in &nums {
            if value < 0 {
                neg += 1;
            } else if value > 0 {
                pos += 1;
            }
        }
        neg.max(pos)
    }
}
