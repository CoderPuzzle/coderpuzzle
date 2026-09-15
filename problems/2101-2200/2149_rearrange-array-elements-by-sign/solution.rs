impl Solution {
    pub fn rearrange_array(nums: Vec<i32>) -> Vec<i32> {
        // Each sign keeps its original relative order, so the k-th
        // positive belongs at slot 2k and the k-th negative at 2k + 1 —
        // one scatter pass places every element directly.
        let mut result = vec![0; nums.len()];
        let (mut positives, mut negatives) = (0usize, 0usize);
        for &value in &nums {
            if value > 0 {
                result[2 * positives] = value;
                positives += 1;
            } else {
                result[2 * negatives + 1] = value;
                negatives += 1;
            }
        }
        result
    }
}
