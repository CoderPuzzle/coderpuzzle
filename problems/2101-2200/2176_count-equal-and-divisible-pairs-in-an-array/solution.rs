impl Solution {
    pub fn count_pairs(nums: Vec<i32>, k: i32) -> i32 {
        // n <= 100, so the direct double loop over index pairs is the
        // whole story: equal values and (i * j) % k == 0.
        let mut count = 0i32;
        let n = nums.len();
        for i in 0..n {
            for j in (i + 1)..n {
                if nums[i] == nums[j] && ((i as i64 * j as i64) % k as i64 == 0) {
                    count += 1;
                }
            }
        }
        count
    }
}
