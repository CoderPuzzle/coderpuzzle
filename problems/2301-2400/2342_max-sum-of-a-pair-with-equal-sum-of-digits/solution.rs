use std::collections::HashMap;

impl Solution {
    pub fn maximum_sum(nums: Vec<i32>) -> i32 {
        let mut best_by_digit_sum: HashMap<i32, i32> = HashMap::new();
        let mut answer = -1;
        for num in nums {
            let mut digit_sum = 0;
            let mut value = num;
            while value > 0 {
                digit_sum += value % 10;
                value /= 10;
            }
            match best_by_digit_sum.get(&digit_sum) {
                Some(&best) => {
                    answer = answer.max(best + num);
                    best_by_digit_sum.insert(digit_sum, best.max(num));
                }
                None => {
                    best_by_digit_sum.insert(digit_sum, num);
                }
            }
        }
        answer
    }
}
