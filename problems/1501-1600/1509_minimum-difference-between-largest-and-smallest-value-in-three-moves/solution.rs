impl Solution {
    pub fn min_difference(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // Four or fewer elements can all be pulled to one value in at most
        // three moves.
        if n <= 4 {
            return 0;
        }
        let mut nums = nums;
        nums.sort();
        // Try each of the four ways to split three removals between the low
        // end and the high end of the sorted array.
        (0..4).map(|i| nums[n - 4 + i] - nums[i]).min().unwrap()
    }
}
