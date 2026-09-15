impl Solution {
    pub fn min_elements(nums: Vec<i32>, limit: i32, goal: i32) -> i32 {
        // Only the array's total matters: one added element moves the sum
        // by at most +/-limit, so closing a gap g takes ceil(g / limit).
        // The sum reaches 1e11, so the accumulation and gap are 64-bit;
        // the answer itself stays below 1.1e9 and fits the i32 return.
        let sum: i64 = nums.iter().map(|&x| x as i64).sum();
        let gap = (goal as i64 - sum).abs();
        ((gap + limit as i64 - 1) / limit as i64) as i32
    }
}
