impl Solution {
    pub fn wiggle_sort(nums: Vec<i32>) -> Vec<i32> {
        // Sort a copy, then fill the even slots from the back of the lower
        // half and the odd slots from the back of the upper half: reversing
        // each half keeps median duplicates as far apart as possible.
        let mut nums = nums;
        let mut ordered = nums.clone();
        ordered.sort();
        let n = ordered.len();
        let m = (n + 1) / 2;
        for k in 0..m {
            nums[2 * k] = ordered[m - 1 - k];
        }
        for k in 0..n - m {
            nums[2 * k + 1] = ordered[n - 1 - k];
        }
        nums
    }
}
