impl Solution {
    pub fn two_sum(numbers: Vec<i32>, target: i32) -> Vec<i32> {
        let (mut left, mut right) = (0usize, numbers.len() - 1);
        while left < right {
            let total = numbers[left] + numbers[right];
            if total == target {
                // 1-based indices as the problem expects.
                return vec![left as i32 + 1, right as i32 + 1];
            } else if total < target {
                // Too small: pairing numbers[left] with anything smaller than
                // numbers[right] only lowers the sum — retire the left value.
                left += 1;
            } else {
                // Too large: retire the right value symmetrically.
                right -= 1;
            }
        }
        // Unreachable under the uniqueness promise; keeps the function total.
        Vec::new()
    }
}
