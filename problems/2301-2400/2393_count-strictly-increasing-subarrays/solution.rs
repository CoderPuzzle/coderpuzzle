impl Solution {
    // run counts strictly increasing subarrays ending at the current
    // index: it grows by one while the rise continues, resets to 1
    // otherwise. Summing counts every subarray exactly once, by its
    // right endpoint.
    pub fn count_subarrays(nums: Vec<i32>) -> i64 {
        let mut total = 0i64;
        let mut run = 0i64;
        for i in 0..nums.len() {
            if i > 0 && nums[i - 1] < nums[i] {
                run += 1;
            } else {
                run = 1;
            }
            total += run;
        }
        total
    }
}
