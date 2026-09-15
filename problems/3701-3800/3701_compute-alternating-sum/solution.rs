impl Solution {
    pub fn alternating_sum(nums: Vec<i32>) -> i32 {
        // Even indices add, odd indices subtract: walk the array two
        // positions at a time, adding each even-index element and
        // subtracting the odd-index partner that follows it. A trailing
        // element at the last even index has no partner to subtract.
        let n = nums.len();
        let mut total = 0;
        let mut i = 0;
        while i < n {
            total += nums[i];
            if i + 1 < n {
                total -= nums[i + 1];
            }
            i += 2;
        }
        total
    }
}
