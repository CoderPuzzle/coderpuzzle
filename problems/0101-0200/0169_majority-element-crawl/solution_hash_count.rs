use std::collections::HashMap;

impl Solution {
    // The guarantee taken at face value: the answer is the one value whose
    // tally passes n / 2, so count occurrences per distinct value and report
    // the first tally to cross that line.
    pub fn majority_element(nums: Vec<i32>) -> i32 {
        let mut counts: HashMap<i32, i32> = HashMap::new();
        let half = (nums.len() / 2) as i32;
        for &value in &nums {
            let tally = counts.entry(value).or_insert(0);
            *tally += 1;
            // No rival can catch a tally already past half: two values cannot
            // both own more than half the positions.
            if *tally > half {
                return value;
            }
        }
        // A majority is promised, so the sweep always returns mid-loop.
        unreachable!("a majority is promised")
    }
}
