impl Solution {
    pub fn minimum_swaps(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let zeros = nums.iter().filter(|&&value| value == 0).count();
        nums.into_iter().take(n - zeros).filter(|&value| value == 0).count() as i32
    }
}
