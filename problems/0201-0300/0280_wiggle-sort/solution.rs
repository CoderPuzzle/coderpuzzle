impl Solution {
    pub fn wiggle_sort(nums: Vec<i32>) -> Vec<i32> {
        // One pass: each pair demands its own relation, and repairing a
        // violated pair with a single swap never re-breaks the pair before it.
        let mut nums = nums;
        for i in 1..nums.len() {
            // Odd i demands nums[i-1] <= nums[i]; even i demands nums[i-1] >= nums[i].
            let violation = if i % 2 == 1 {
                nums[i - 1] > nums[i]
            } else {
                nums[i - 1] < nums[i]
            };
            if violation {
                nums.swap(i - 1, i);
            }
        }
        nums
    }
}
