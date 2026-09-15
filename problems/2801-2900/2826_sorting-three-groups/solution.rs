impl Solution {
    pub fn minimum_operations(nums: Vec<i32>) -> i32 {
        // Removing the minimum number of elements is keeping the maximum
        // non-decreasing subsequence, and with values confined to {1, 2, 3}
        // such a subsequence is a run of 1s, then 2s, then 3s. One pass
        // keeps three running best lengths ending in each value: appending
        // x may extend any subsequence ending in a value <= x, so each
        // update is one plus the largest eligible counter. n <= 100 keeps
        // every count far inside i32 range.
        let mut keep1 = 0;
        let mut keep2 = 0;
        let mut keep3 = 0;
        for &x in &nums {
            if x == 1 {
                keep1 += 1;
            } else if x == 2 {
                keep2 = keep2.max(keep1) + 1;
            } else {
                keep3 = keep3.max(keep2.max(keep1)) + 1;
            }
        }
        nums.len() as i32 - keep1.max(keep2).max(keep3)
    }
}
