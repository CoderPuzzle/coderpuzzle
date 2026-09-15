use std::collections::HashSet;

impl Solution {
    pub fn build_array(target: Vec<i32>, n: i32) -> Vec<String> {
        let wanted: HashSet<i32> = target.iter().cloned().collect();
        let last = *target.last().unwrap();
        let mut operations: Vec<String> = Vec::new();
        for value in 1..=last {
            operations.push(String::from("Push"));
            if !wanted.contains(&value) {
                operations.push(String::from("Pop"));
            }
        }
        operations
    }
}
