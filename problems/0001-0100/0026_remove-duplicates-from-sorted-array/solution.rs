impl Solution {
    pub fn remove_duplicates(mut nums: Vec<i32>) -> Vec<i32> {
        // Ownership hands over the whole allocation, so the compaction
        // reuses it in place — no second vector is ever built. write marks
        // the end of the unique prefix; the first element is always kept.
        let mut write = 1;
        for read in 1..nums.len() {
            // nums[write - 1] is the last value kept; in a sorted array the
            // scan meets a new value exactly when the previous run ends.
            if nums[read] != nums[write - 1] {
                nums[write] = nums[read];
                write += 1;
            }
        }
        // The statement frees the tail beyond the unique prefix, so the
        // compacted prefix is the whole judged answer; its length is k.
        nums.truncate(write);
        nums
    }
}
