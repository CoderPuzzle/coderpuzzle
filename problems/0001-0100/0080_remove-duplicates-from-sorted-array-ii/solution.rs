impl Solution {
    pub fn remove_duplicates(mut nums: Vec<i32>) -> Vec<i32> {
        // Ownership hands over the whole allocation, so the compaction
        // reuses it in place — no second vector is ever built. write marks
        // the end of the at-most-twice prefix; the first two elements are
        // always kept.
        if nums.len() <= 2 {
            return nums;
        }
        let mut write = 2;
        for read in 2..nums.len() {
            // nums[write - 2] is the value two slots back in the kept
            // prefix; it equals nums[read] only when that value already
            // holds both of its allowed copies.
            if nums[read] != nums[write - 2] {
                nums[write] = nums[read];
                write += 1;
            }
        }
        // The statement frees the tail beyond the kept prefix, so the
        // compacted prefix is the whole judged answer; its length is k.
        nums.truncate(write);
        nums
    }
}
