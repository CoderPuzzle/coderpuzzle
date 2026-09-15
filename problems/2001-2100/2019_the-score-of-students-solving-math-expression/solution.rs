use std::collections::HashSet;

impl Solution {
    pub fn score_of_students(s: String, answers: Vec<i32>) -> i32 {
        let correct = Self::correct_value(s.as_bytes());
        let size = (s.len() + 1) / 2;
        let bytes = s.as_bytes();
        let numbers: Vec<i32> = (0..size).map(|index| (bytes[index * 2] - b'0') as i32).collect();
        let operators: Vec<u8> = (0..size - 1).map(|index| bytes[index * 2 + 1]).collect();
        let mut dp: Vec<Vec<HashSet<i32>>> = (0..size).map(|_| (0..size).map(|_| HashSet::new()).collect()).collect();
        for index in 0..size {
            dp[index][index].insert(numbers[index]);
        }

        for length in 2..=size {
            for left in 0..=size - length {
                let right = left + length - 1;
                for split in left..right {
                    let first_values: Vec<i32> = dp[left][split].iter().copied().collect();
                    let second_values: Vec<i32> = dp[split + 1][right].iter().copied().collect();
                    for first in &first_values {
                        for second in &second_values {
                            let value = if operators[split] == b'+' {
                                *first as i64 + *second as i64
                            } else {
                                *first as i64 * *second as i64
                            };
                            if value <= 1000 {
                                dp[left][right].insert(value as i32);
                            }
                        }
                    }
                }
            }
        }

        let mut score = 0;
        for answer in answers {
            if answer as i64 == correct {
                score += 5;
            } else if dp[0][size - 1].contains(&answer) {
                score += 2;
            }
        }
        score
    }

    fn correct_value(expression: &[u8]) -> i64 {
        let mut total = 0_i64;
        let mut product = (expression[0] - b'0') as i64;
        for index in (1..expression.len()).step_by(2) {
            let value = (expression[index + 1] - b'0') as i64;
            if expression[index] == b'*' {
                product *= value;
            } else {
                total += product;
                product = value;
            }
        }
        total + product
    }
}
