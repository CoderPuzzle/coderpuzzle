impl Solution {
    pub fn largest_perimeter(nums: Vec<i32>) -> i32 {
        // Sort ascending: the maximal-perimeter triangle, if one exists,
        // sits on three consecutive sorted entries, so a scan from the top
        // decides the answer.
        let mut nums = nums;
        nums.sort();
        for i in (2..nums.len()).rev() {
            // Strict inequality only: the two smaller sides summing to the
            // largest is a zero-area line, not a triangle.
            if nums[i - 2] + nums[i - 1] > nums[i] {
                return nums[i - 2] + nums[i - 1] + nums[i];
            }
        }
        0
    }
}
