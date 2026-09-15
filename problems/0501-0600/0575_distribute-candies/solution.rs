use std::collections::HashSet;

impl Solution {
    pub fn distribute_candies(candyType: Vec<i32>) -> i32 {
        // Two caps compete: Alice eats at most n / 2 candies, and there are
        // only as many types as distinct values. Each eaten candy can be a
        // new type until the types or the allowance runs out, so the answer
        // is the smaller of the distinct count and half the length.
        let types: HashSet<i32> = candyType.iter().copied().collect();
        types.len().min(candyType.len() / 2) as i32
    }
}
