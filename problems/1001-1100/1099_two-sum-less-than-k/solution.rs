impl Solution {
    pub fn two_sum_less_than_k(nums: Vec<i32>, k: i32) -> i32 {
        // Sort, then two pointers: advance lo on small sums, retreat hi on
        // large ones, tracking the largest sum below k.
        let mut nums = nums;
        nums.sort_unstable();
        let (mut lo, mut hi) = (0usize, nums.len() - 1);
        let mut best = -1;
        while lo < hi {
            let s = nums[lo] + nums[hi];
            if s < k {
                if s > best {
                    best = s;
                }
                lo += 1;
            } else {
                hi -= 1;
            }
        }
        best
    }
}
