impl Solution {
    // Every operation collapses a consecutive segment to its maximum, so
    // any reachable array is the segment maxes of a partition of nums into
    // consecutive blocks whose maxes are non-decreasing. Greedy from the
    // left: cut a new block at every element that reaches the running
    // maximum (a prefix high, equal included) — the earliest cut is always
    // safe, and absorbing a smaller element never enables an extra cut
    // later. All values fit 32-bit: answers <= n <= 2e5.
    pub fn maximum_possible_size(nums: Vec<i32>) -> i32 {
        let mut size = 0;
        let mut run_max = 0;
        for &x in &nums {
            if x >= run_max {
                size += 1;
                run_max = x;
            }
        }
        size
    }
}
