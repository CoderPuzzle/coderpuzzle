impl Solution {
    pub fn find_indices(nums: Vec<i32>, indexDifference: i32, valueDifference: i32) -> Vec<i32> {
        // For each later index j, every legal partner t satisfies
        // t <= j - indexDifference, and the largest |nums[t] - nums[j]| over
        // that window is attained at its minimum or maximum, so remembering
        // the first index of each extreme as the window grows is enough.
        // Testing the minimum candidate before the maximum, and keeping
        // first occurrences on ties, pins one deterministic answer out of
        // the many the statement permits.
        let n = nums.len();
        let mut min_idx: isize = -1;
        let mut max_idx: isize = -1;
        for j in 0..n {
            let t = j as isize - indexDifference as isize;
            if t < 0 {
                continue;
            }
            let t = t as usize;
            if min_idx == -1 || nums[t] < nums[min_idx as usize] {
                min_idx = t as isize;
            }
            if max_idx == -1 || nums[t] > nums[max_idx as usize] {
                max_idx = t as isize;
            }
            if (nums[j] - nums[min_idx as usize]).abs() >= valueDifference {
                return vec![min_idx as i32, j as i32];
            }
            if (nums[j] - nums[max_idx as usize]).abs() >= valueDifference {
                return vec![max_idx as i32, j as i32];
            }
        }
        vec![-1, -1]
    }
}
