// The direct reading the follow-up names: square every element in place,
// then let the language's sort produce the order. The input's own
// arrangement is never consulted — squaring kills the sign, so negatives
// need no case of their own.
impl Solution {
    pub fn sorted_squares(nums: Vec<i32>) -> Vec<i32> {
        let mut squares: Vec<i32> = nums.iter().map(|&value| value * value).collect();
        squares.sort_unstable();
        squares
    }
}
