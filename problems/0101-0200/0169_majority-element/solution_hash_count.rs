use std::collections::HashMap;

impl Solution {
    pub fn majority_element(nums: Vec<i32>) -> i32 {
        // The premise taken literally: the answer turns up more than n / 2
        // times, so tally every value and stop at the first tally that
        // crosses half the array.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        let half = (nums.len() / 2) as i32;
        for &num in &nums {
            let tally = counts.entry(num).or_insert(0);
            *tally += 1;
            // No value can be overtaken once a tally passes half: two
            // values cannot both hold more than half the positions.
            if *tally > half {
                return num;
            }
        }
        // A majority is promised, so the sweep always returns mid-loop.
        unreachable!("a majority is promised")
    }
}
