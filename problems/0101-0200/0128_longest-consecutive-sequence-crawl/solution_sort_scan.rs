impl Solution {
    pub fn longest_consecutive(mut nums: Vec<i32>) -> i32 {
        // Sort in place (we own the vec): duplicates become neighbours and
        // every maximal chain becomes one contiguous run of +1 steps, so a
        // single walk measures them all.
        nums.sort_unstable();
        let mut best: i32 = 0;
        let mut run: i32 = 0;
        let mut previous: i32 = 0;
        for (index, &value) in nums.iter().enumerate() {
            if index == 0 || value > previous + 1 {
                // A gap of two or more (or the very first entry) starts a
                // fresh chain.
                run = 1;
            } else if value == previous + 1 {
                run += 1;
            }
            // An equal value is a duplicate of one already counted: the run
            // keeps its length.
            previous = value;
            best = best.max(run);
        }
        // An empty array never enters the loop, so 0 falls out for free.
        best
    }
}
