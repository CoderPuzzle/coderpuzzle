impl Solution {
    pub fn check(nums: Vec<i32>) -> bool {
        // Read the array as a ring: a sorted-then-rotated array
        // descends at most once, at the rotation seam.
        let n = nums.len();
        let mut descents = 0;
        for i in 0..n {
            if nums[i] > nums[(i + 1) % n] {
                descents += 1;
                if descents > 1 {
                    return false;
                }
            }
        }
        true
    }
}
