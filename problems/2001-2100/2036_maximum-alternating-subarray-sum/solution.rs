impl Solution {
    pub fn maximum_alternating_subarray_sum(nums: Vec<i32>) -> i64 {
        let mut plus = nums[0] as i64;
        let mut minus = 0_i64;
        let mut has_minus = false;
        let mut answer = plus;

        for &number in nums.iter().skip(1) {
            let value = number as i64;
            let mut new_plus = value;
            if has_minus {
                new_plus = new_plus.max(minus + value);
            }
            let new_minus = plus - value;

            answer = answer.max(new_plus).max(new_minus);
            plus = new_plus;
            minus = new_minus;
            has_minus = true;
        }
        answer
    }
}
