impl Solution {
    pub fn left_right_difference(nums: Vec<i32>) -> Vec<i32> {
        // rightSum[i] is just total - leftSum[i] - nums[i], so one running
        // prefix replaces both arrays: pay one pass for the total, then a
        // second that walks left forward and emits each absolute
        // difference.
        let mut total = 0i64;
        for &value in &nums {
            total += value as i64;
        }
        let mut answer = Vec::with_capacity(nums.len());
        let mut left = 0i64;
        for &value in &nums {
            let diff = left - (total - left - value as i64);
            answer.push(diff.unsigned_abs() as i32);
            left += value as i64;
        }
        answer
    }
}
