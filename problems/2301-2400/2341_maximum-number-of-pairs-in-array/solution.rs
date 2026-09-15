use std::collections::HashMap;

impl Solution {
    pub fn number_of_pairs(nums: Vec<i32>) -> Vec<i32> {
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for num in nums {
            *counts.entry(num).or_insert(0) += 1;
        }
        let mut pairs = 0;
        let mut leftovers = 0;
        for count in counts.values() {
            pairs += count / 2;
            leftovers += count % 2;
        }
        vec![pairs, leftovers]
    }
}
