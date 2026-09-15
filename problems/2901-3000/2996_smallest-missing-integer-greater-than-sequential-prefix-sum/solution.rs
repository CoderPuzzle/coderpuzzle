use std::collections::HashSet;

impl Solution {
    pub fn missing_integer(nums: Vec<i32>) -> i32 {
        // The floor of the answer is the sum of the longest prefix in which
        // every value is exactly its predecessor plus one; the first break
        // in that progression ends the prefix, so one scan settles it.
        let mut total = nums[0];
        for i in 1..nums.len() {
            if nums[i] != nums[i - 1] + 1 {
                break;
            }
            total += nums[i];
        }
        // From that floor, step upward past every value the array holds;
        // the first gap is the smallest missing integer.
        let present: HashSet<i32> = nums.iter().copied().collect();
        while present.contains(&total) {
            total += 1;
        }
        total
    }
}
