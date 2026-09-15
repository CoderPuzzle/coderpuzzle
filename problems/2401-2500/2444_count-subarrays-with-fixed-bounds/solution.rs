impl Solution {
    pub fn count_subarrays(nums: Vec<i32>, min_k: i32, max_k: i32) -> i64 {
        let mut count = 0i64;
        // most recent positions of an out-of-range element, min_k, max_k
        let mut last_bad: i64 = -1;
        let mut last_min: i64 = -1;
        let mut last_max: i64 = -1;
        for (i, &x) in nums.iter().enumerate() {
            let i = i as i64;
            // a valid subarray ending later must start after a bad element
            if x < min_k || x > max_k {
                last_bad = i;
            }
            // tracking the last occurrence is enough: it covers earlier ones
            if x == min_k {
                last_min = i;
            }
            if x == max_k {
                last_max = i;
            }
            // starts for this right end: after last_bad, at or before
            // min(last_min, last_max); the 0 clamp skips ends with none
            count += (last_min.min(last_max) - last_bad).max(0);
        }
        count
    }
}
