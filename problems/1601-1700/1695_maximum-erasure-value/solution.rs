impl Solution {
    // Erasing one all-distinct subarray for the highest score is a
    // search for the maximum-sum window with no repeated value. Sweep
    // the right end forward, and while the incoming value is already
    // inside the window, retire elements from the left, dropping their
    // sum. Values lie in [1, 10^4], so a flat count array spots the
    // repeat in constant time, and because every value is positive the
    // longest distinct window ending at each right end is also the
    // richest one there. The total can reach 10^5 * 10^4 = 10^9, barely
    // inside 32 bits, so it is accumulated in an i64 and narrowed once
    // at the return.
    pub fn maximum_unique_subarray(nums: Vec<i32>) -> i32 {
        let mut freq = vec![0i32; 10001];
        let mut left = 0;
        let mut window_sum = 0i64;
        let mut best = 0i64;
        for &value in &nums {
            let slot = value as usize;
            while freq[slot] > 0 {
                let leaving = nums[left] as usize;
                freq[leaving] -= 1;
                window_sum -= nums[left] as i64;
                left += 1;
            }
            freq[slot] += 1;
            window_sum += value as i64;
            best = best.max(window_sum);
        }
        best as i32
    }
}
