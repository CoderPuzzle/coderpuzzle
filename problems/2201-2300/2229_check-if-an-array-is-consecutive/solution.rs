impl Solution {
    pub fn is_consecutive(mut nums: Vec<i32>) -> bool {
        nums.sort_unstable();
        nums.windows(2).all(|w| w[1] - w[0] == 1)
    }
}
