use std::collections::HashMap;

impl Solution {
    pub fn minimum_seconds(nums: Vec<i32>) -> i32 {
        let mut first_seen: HashMap<i32, usize> = HashMap::new();
        let mut last_seen: HashMap<i32, usize> = HashMap::new();
        let mut max_forward_gap: HashMap<i32, usize> = HashMap::new();
        for (i, &num) in nums.iter().enumerate() {
            if first_seen.contains_key(&num) {
                let gap = i - last_seen[&num];
                let widest = max_forward_gap.entry(num).or_insert(0);
                if gap > *widest {
                    *widest = gap;
                }
            } else {
                first_seen.insert(num, i);
                max_forward_gap.insert(num, 0);
            }
            last_seen.insert(num, i);
        }
        let n = nums.len();
        let mut answer = n;
        for (&num, &start) in &first_seen {
            let gap = (n - last_seen[&num] + start).max(max_forward_gap[&num]);
            answer = answer.min(gap / 2);
        }
        answer as i32
    }
}
