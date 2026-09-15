impl Solution {
    pub fn max_alternating_sum(nums: Vec<i32>) -> i64 {
        // Squares erase signs, so sort the squared magnitudes and put the
        // largest ceil(n / 2) on the plus slots, the rest on minus slots.
        let mut squares: Vec<i64> = nums.iter().map(|&value| value as i64 * value as i64).collect();
        squares.sort_unstable();
        let minus = squares.len() / 2;
        let mut score = 0_i64;
        for (index, &square) in squares.iter().enumerate() {
            if index < minus {
                score -= square;
            } else {
                score += square;
            }
        }
        score
    }
}
