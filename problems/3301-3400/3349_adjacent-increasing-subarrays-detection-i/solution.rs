impl Solution {
    pub fn has_increasing_subarrays(nums: Vec<i32>, k: i32) -> bool {
        // run[i] = length of the strictly increasing run ending at i. The
        // window ending at i is strictly increasing exactly when run[i] is
        // at least k, so two adjacent windows end k apart and both qualify
        // when run[i] and run[i - k] both reach k.
        let n = nums.len();
        let mut run = vec![1usize; n];
        for i in 1..n {
            if nums[i] > nums[i - 1] {
                run[i] = run[i - 1] + 1;
            }
        }
        let k = k as usize;
        ((2 * k - 1)..n).any(|i| run[i] >= k && run[i - k] >= k)
    }
}
