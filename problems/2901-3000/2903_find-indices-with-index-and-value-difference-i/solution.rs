impl Solution {
    pub fn find_indices(nums: Vec<i32>, indexDifference: i32, valueDifference: i32) -> Vec<i32> {
        // The first ordered pair (i, j) clearing both thresholds is a valid
        // answer by the statement's "return any of them"; the conditions are
        // symmetric in the two indices, so scan order only picks the witness.
        for i in 0..nums.len() as i32 {
            for j in 0..nums.len() as i32 {
                if (i - j).abs() >= indexDifference && (nums[i as usize] - nums[j as usize]).abs() >= valueDifference {
                    return vec![i, j];
                }
            }
        }
        // Every ordered pair failed both checks, so no answer exists.
        vec![-1, -1]
    }
}
