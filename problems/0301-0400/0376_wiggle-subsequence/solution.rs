impl Solution {
    pub fn wiggle_max_length(nums: Vec<i32>) -> i32 {
        // Only direction changes matter: start the count at the first
        // element and increment it once per strict flip of travel.
        let mut count = 1;
        // 1 while rising, -1 while falling, 0 before any move.
        let mut direction = 0;
        for i in 1..nums.len() {
            // A fresh rise counts only after a fall (or at the start); an
            // equal or same-direction step changes nothing.
            if direction <= 0 && nums[i] > nums[i - 1] {
                count += 1;
                direction = 1;
            } else if direction >= 0 && nums[i] < nums[i - 1] {
                count += 1;
                direction = -1;
            }
        }
        count
    }
}
