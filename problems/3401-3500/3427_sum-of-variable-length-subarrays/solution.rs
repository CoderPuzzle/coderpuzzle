impl Solution {
    pub fn subarray_sum(nums: Vec<i32>) -> i32 {
        // Window i covers nums[max(0, i - nums[i]) .. i] inclusive, so a
        // running prefix sum answers each window in O(1) as
        // prefix[i + 1] - prefix[start]. n <= 100 and nums[i] <= 1000 cap
        // the total at 100 windows * 100 elements * 1000 = 10^7, well
        // inside i32.
        let n = nums.len();
        let mut prefix = vec![0i32; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        let mut total = 0i32;
        for i in 0..n {
            let start = (i as i32 - nums[i]).max(0) as usize;
            total += prefix[i + 1] - prefix[start];
        }
        total
    }
}
