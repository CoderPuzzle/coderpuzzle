impl Solution {
    pub fn max_subarray_sum(nums: Vec<i32>, k: i32) -> i64 {
        const NEG: i64 = i64::MIN / 4;
        let mut none = NEG;
        let mut multiply = NEG;
        let mut divide = NEG;
        let mut done = NEG;
        let mut answer = NEG;
        for &value in &nums {
            let multiplied = value as i64 * k as i64;
            let divided = value / k;
            let prev_none = none;
            let prev_multiply = multiply;
            let prev_divide = divide;
            let prev_done = done;
            none = (value as i64).max(prev_none + value as i64);
            multiply = multiplied.max(prev_none + multiplied).max(prev_multiply + multiplied);
            divide = (divided as i64)
                .max(prev_none + divided as i64)
                .max(prev_divide + divided as i64);
            done = (prev_multiply + value as i64)
                .max(prev_divide + value as i64)
                .max(prev_done + value as i64);
            answer = answer.max(none).max(multiply).max(divide).max(done);
        }
        answer
    }
}
