impl Solution {
    pub fn minimum_operations(nums: Vec<i32>) -> i32 {
        // Greedy two pointers on block sums: the front block (nums[0..i])
        // must end up equal to the back block. While they differ, the
        // smaller side absorbs its next adjacent element — one merge, and
        // merging can never help the larger side catch up. Equal blocks
        // retire together and scanning continues inside. Block sums reach
        // 10^5 * 10^6 = 10^11, so they ride in i64.
        let mut i: usize = 0;
        let mut j: usize = nums.len() - 1;
        let mut left: i64 = 0;
        let mut right: i64 = 0;
        let mut ops = 0i32;
        while i < j {
            if left == 0 {
                left = nums[i] as i64;
            }
            if right == 0 {
                right = nums[j] as i64;
            }
            if left == right {
                i += 1;
                j -= 1;
                left = 0;
                right = 0;
            } else if left < right {
                i += 1;
                left += nums[i] as i64;
                ops += 1;
            } else {
                j -= 1;
                right += nums[j] as i64;
                ops += 1;
            }
        }
        ops
    }
}
