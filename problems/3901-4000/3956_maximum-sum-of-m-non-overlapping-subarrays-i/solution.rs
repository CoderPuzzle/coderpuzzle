use std::collections::VecDeque;

impl Solution {
    pub fn maximum_sum(nums: Vec<i32>, m: i32, l: i32, r: i32) -> i64 {
        let n = nums.len();
        let l = l as usize;
        let r = r as usize;
        let mut prefix = vec![0i64; n + 1];
        for i in 1..=n {
            prefix[i] = prefix[i - 1] + nums[i - 1] as i64;
        }

        let impossible = i64::MIN / 4;
        let mut previous = vec![0i64; n + 1];
        let mut answer = impossible;

        for _ in 0..(m as usize).min(n / l) {
            let mut current = vec![impossible; n + 1];
            let mut candidates: VecDeque<(usize, i64)> = VecDeque::new();

            for end in 1..=n {
                if end >= l {
                    let start = end - l;
                    if previous[start] != impossible {
                        let value = previous[start] - prefix[start];
                        while candidates.back().map_or(false, |&(_, old)| old <= value) {
                            candidates.pop_back();
                        }
                        candidates.push_back((start, value));
                    }
                }

                let earliest = end.saturating_sub(r);
                while candidates.front().map_or(false, |&(start, _)| start < earliest) {
                    candidates.pop_front();
                }

                current[end] = current[end - 1];
                if let Some(&(_, value)) = candidates.front() {
                    current[end] = current[end].max(prefix[end] + value);
                }
            }
            answer = answer.max(current[n]);
            previous = current;
        }
        answer
    }
}
