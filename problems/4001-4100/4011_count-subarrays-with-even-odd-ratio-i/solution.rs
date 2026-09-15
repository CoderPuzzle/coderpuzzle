impl Solution {
    pub fn count_ratio_subarrays(nums: Vec<i32>, a: i32, b: i32) -> i64 {
        // Only element parity matters. Fix the left endpoint and extend the
        // right endpoint, carrying running even/odd counts so every subarray
        // is tested exactly once with its exact counts.
        let n = nums.len();
        let mut total: i64 = 0;
        for left in 0..n {
            let mut even: i64 = 0;
            let mut odd: i64 = 0;
            for right in left..n {
                if nums[right] % 2 == 0 {
                    even += 1;
                } else {
                    odd += 1;
                }
                // Valid iff y > 0 and x/y <= a/b; with positive denominators
                // that is exactly b*even <= a*odd.
                if odd > 0 && b as i64 * even <= a as i64 * odd {
                    total += 1;
                }
            }
        }
        total
    }
}
