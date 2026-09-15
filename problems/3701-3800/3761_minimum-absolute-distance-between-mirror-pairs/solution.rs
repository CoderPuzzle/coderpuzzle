use std::collections::HashMap;

impl Solution {
    pub fn min_mirror_pair_distance(nums: Vec<i32>) -> i32 {
        let mut best = -1;
        // Most recent index for each reversed value; a nearer supplier beats
        // a farther one for every future match, so older entries never
        // matter again.
        let mut latest: HashMap<i32, usize> = HashMap::new();
        for index in 0..nums.len() {
            let num = nums[index];
            // Look up before recording: an index cannot pair with itself, so
            // palindromic values wait here for a genuine second occurrence.
            if let Some(&mirror) = latest.get(&num) {
                let distance = (index - mirror) as i32;
                if best == -1 || distance < best {
                    best = distance;
                }
            }
            // Reversal peels last digits off until none remain; trailing
            // zeros drop out on their own (120 -> 21, 100 -> 1).
            let mut reversed_value: i32 = 0;
            let mut value = num;
            while value > 0 {
                reversed_value = reversed_value * 10 + value % 10;
                value /= 10;
            }
            latest.insert(reversed_value, index);
        }
        best
    }
}
