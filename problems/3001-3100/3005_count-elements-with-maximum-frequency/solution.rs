use std::collections::HashMap;

impl Solution {
    pub fn max_frequency_elements(nums: Vec<i32>) -> i32 {
        // One pass builds the value -> frequency map; every value whose
        // frequency equals the maximum contributes that many elements.
        let mut frequencies: HashMap<i32, i32> = HashMap::new();
        for &num in &nums {
            *frequencies.entry(num).or_insert(0) += 1;
        }
        let maximum = frequencies.values().copied().max().unwrap_or(0);
        frequencies.values().copied().filter(|&count| count == maximum).sum()
    }
}
