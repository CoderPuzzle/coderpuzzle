use std::collections::HashMap;

impl Solution {
    pub fn maximum_length(nums: Vec<i32>) -> i32 {
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for value in &nums {
            *counts.entry(*value).or_insert(0) += 1;
        }
        let mut best = 0;
        if let Some(&ones) = counts.get(&1) {
            // 1 squared is 1, so a run of 1s forms its own pattern: an odd
            // number is selectable; drop one when the count is even.
            best = if ones % 2 == 1 { ones } else { ones - 1 };
        }
        for &value in counts.keys() {
            if value == 1 {
                continue;
            }
            // Climb x, x^2, x^4, ... taking a pair at every level but the
            // top, which stays single. Cap 31622 is the largest base whose
            // square does not exceed the 10^9 constraint bound, so the
            // i64 product below never overflows.
            let mut length = 1_i32;
            let mut current = value as i64;
            while current <= 31622 && counts[&(current as i32)] >= 2 {
                let square = current * current;
                match counts.get(&(square as i32)) {
                    Some(_) => {
                        length += 2;
                        current = square;
                    }
                    None => break,
                }
            }
            best = best.max(length);
        }
        best
    }
}
