impl Solution {
    // Scores grow with every extension: appending x to a window with sum s
    // and length l changes the score by s + x*l + x > 0 (all elements are
    // >= 1), so valid windows for a fixed right endpoint form a suffix that
    // only shrinks as right advances. The sum reaches n * max = 10^10, past
    // i32 range, so it widens to i64; no score exceeds 10^10 * 10^5 = 10^15,
    // far below the ~9.2 * 10^18 i64 ceiling.
    pub fn count_subarrays(nums: Vec<i32>, k: i64) -> i64 {
        let mut total = 0_i64;
        let mut window_sum = 0_i64;
        let mut left = 0_usize;
        for right in 0..nums.len() {
            window_sum += nums[right] as i64;
            // left <= right guards the length arithmetic: usize may not go
            // negative, and once the window empties (score 0 < k since
            // k >= 1) there is nothing left to shrink anyway.
            while left <= right && window_sum * (right - left + 1) as i64 >= k {
                window_sum -= nums[left] as i64;
                left += 1;
            }
            // The window is now the longest qualifying subarray ending at
            // right; every shorter suffix qualifies too.
            total += (right - left + 1) as i64;
        }
        total
    }
}
