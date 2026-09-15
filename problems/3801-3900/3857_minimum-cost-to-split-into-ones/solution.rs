impl Solution {
    pub fn min_cost(n: i32) -> i32 {
        // Every unordered pair of final unit pieces is separated, and charged,
        // exactly once somewhere in the split tree.
        n * (n - 1) / 2
    }
}
