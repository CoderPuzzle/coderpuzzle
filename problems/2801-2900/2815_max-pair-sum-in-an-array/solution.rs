use std::collections::HashMap;

impl Solution {
    pub fn max_sum(nums: Vec<i32>) -> i32 {
        let mut best_by_largest_digit: HashMap<i32, i32> = HashMap::new();
        let mut answer = -1;
        for num in nums {
            let mut largest_digit = 0;
            let mut value = num;
            while value > 0 {
                largest_digit = largest_digit.max(value % 10);
                value /= 10;
            }
            match best_by_largest_digit.get(&largest_digit) {
                Some(&best) => {
                    answer = answer.max(best + num);
                    best_by_largest_digit.insert(largest_digit, best.max(num));
                }
                None => {
                    best_by_largest_digit.insert(largest_digit, num);
                }
            }
        }
        answer
    }
}
