impl Solution {
    // A subarray qualifies exactly when it holds >= k copies of
    // M = max(nums). Scan right ends, shrink the left end while the window
    // keeps k copies; afterwards `left` is the number of start positions
    // that still keep k copies for the current right end, so each
    // qualifying subarray is counted exactly once, at its right end.
    // Answer peaks at n*(n+1)/2 ~ 5*10^9, hence the i64 return.
    pub fn count_subarrays(nums: Vec<i32>, k: i32) -> i64 {
        let m = *nums.iter().max().unwrap();
        let mut answer: i64 = 0;
        let mut left = 0usize;
        let mut count = 0i32;
        for right in 0..nums.len() {
            if nums[right] == m {
                count += 1;
            }
            while count == k {
                if nums[left] == m {
                    count -= 1;
                }
                left += 1;
            }
            answer += left as i64;
        }
        answer
    }
}
