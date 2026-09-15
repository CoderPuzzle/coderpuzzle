impl Solution {
    pub fn min_operations(nums: Vec<i32>, k: i32) -> i32 {
        // Each operation removes the current smallest element, so exactly the
        // values strictly below k get removed, each exactly once.
        nums.iter().filter(|&&value| value < k).count() as i32
    }
}
