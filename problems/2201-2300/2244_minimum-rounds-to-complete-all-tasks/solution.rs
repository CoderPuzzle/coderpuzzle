use std::collections::HashMap;

impl Solution {
    pub fn minimum_rounds(tasks: Vec<i32>) -> i32 {
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for task in &tasks {
            *counts.entry(*task).or_insert(0) += 1;
        }
        let mut rounds = 0;
        for count in counts.values() {
            if *count == 1 {
                return -1;
            }
            rounds += (count + 2) / 3;
        }
        rounds
    }
}
