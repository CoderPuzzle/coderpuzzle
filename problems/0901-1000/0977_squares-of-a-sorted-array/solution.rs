// The input is sorted, so the largest remaining square always sits at one of
// the two ends of the unprocessed window. Compare the squares of the two
// ends, write the larger into the back of the answer, and move that end
// inward — one pass, no sort. Ties take the left end; both squares are
// written, one now and one in a later step.
impl Solution {
    pub fn sorted_squares(nums: Vec<i32>) -> Vec<i32> {
        let mut squares = vec![0; nums.len()];
        let mut left = 0;
        let mut right = nums.len() - 1;
        for position in (0..nums.len()).rev() {
            let left_square = nums[left] * nums[left];
            let right_square = nums[right] * nums[right];
            if left_square >= right_square {
                squares[position] = left_square;
                left += 1;
            } else {
                squares[position] = right_square;
                right -= 1;
            }
        }
        squares
    }
}
