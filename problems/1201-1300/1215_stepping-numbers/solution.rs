use std::collections::VecDeque;

impl Solution {
    pub fn count_stepping_numbers(low: i64, high: i64) -> Vec<i64> {
        // Seed with every one-digit number, then extend by one digit: the
        // successor of a number ending in d is built from d-1 and d+1 only.
        let mut out = Vec::new();
        if low <= 0 && 0 <= high {
            out.push(0);
        }
        let mut queue: VecDeque<i64> = (1..=9).collect();
        while let Some(current) = queue.pop_front() {
            if current > high {
                continue;
            }
            if current >= low {
                out.push(current);
            }
            let last = current % 10;
            for digit in [last - 1, last + 1] {
                if (0..=9).contains(&digit) {
                    queue.push_back(current * 10 + digit);
                }
            }
        }
        out
    }
}
