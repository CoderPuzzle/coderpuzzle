impl Solution {
    pub fn min_moves(nums: Vec<i32>) -> i32 {
        // Only increments exist, so every element must climb to a common
        // target at least as high as the largest value already present;
        // the cheapest such target is that largest value itself.
        let target = *nums.iter().max().unwrap();
        // Each element pays exactly its own deficit to reach it, and the
        // moves never interact, so the answer sums the deficits directly.
        nums.iter().map(|&num| target - num).sum()
    }
}
