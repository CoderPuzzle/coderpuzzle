impl Solution {
    pub fn minimum_sum_subarray(nums: Vec<i32>, l: i32, r: i32) -> i32 {
        // Prefix sums turn each candidate window into an O(1) subtraction,
        // so scanning every (start, length) pair is O(n^2) windows overall.
        // With n <= 100 and |nums[i]| <= 1000 every partial sum stays far
        // inside 32 bits.
        let n = nums.len();
        let mut prefix = vec![0i32; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        let mut best = -1;
        for start in 0..n {
            for length in l..=r {
                let end = start + length as usize;
                if end > n {
                    break;
                }
                let total = prefix[end] - prefix[start];
                if total > 0 && (best == -1 || total < best) {
                    best = total;
                }
            }
        }
        best
    }
}
