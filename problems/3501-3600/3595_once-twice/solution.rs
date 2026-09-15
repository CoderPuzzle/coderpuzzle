use std::collections::HashMap;

impl Solution {
    pub fn once_twice(nums: Vec<i32>) -> Vec<i32> {
        // Exactly one value occurs once, one occurs twice, the rest thrice;
        // a frequency table over the distinct values finds the two specials.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for &x in &nums {
            *counts.entry(x).or_insert(0) += 1;
        }
        let mut once = 0;
        let mut twice = 0;
        // First answer is the count-1 value, second the count-2 value.
        for (&value, &count) in counts.iter() {
            if count == 1 {
                once = value;
            } else if count == 2 {
                twice = value;
            }
        }
        vec![once, twice]
    }
}
