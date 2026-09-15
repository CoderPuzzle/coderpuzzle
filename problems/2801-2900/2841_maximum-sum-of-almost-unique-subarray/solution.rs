use std::collections::HashMap;

impl Solution {
    // Slides a fixed-length-k window holding a value->count map, so the map
    // size is always the current window's distinct count. Window sums reach
    // n * max(nums[i]) = 2 * 10^4 * 10^9 = 2 * 10^13, past i32 range, so
    // they widen to i64; no intermediate exceeds that, far below the
    // ~9.2 * 10^18 i64 ceiling.
    pub fn max_sum(nums: Vec<i32>, m: i32, k: i32) -> i64 {
        let mut best = 0_i64;
        let mut freq: HashMap<i32, i32> = HashMap::new();
        let mut win_sum = 0_i64;
        let k = k as usize;
        for right in 0..nums.len() {
            *freq.entry(nums[right]).or_insert(0) += 1;
            win_sum += nums[right] as i64;
            if right >= k {
                let old = nums[right - k];
                let count = freq.get(&old).unwrap() - 1;
                if count == 0 {
                    freq.remove(&old);
                } else {
                    freq.insert(old, count);
                }
                win_sum -= old as i64;
            }
            if right + 1 >= k && freq.len() >= m as usize && win_sum > best {
                best = win_sum;
            }
        }
        best
    }
}
