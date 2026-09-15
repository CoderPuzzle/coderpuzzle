use std::collections::HashSet;

impl Solution {
    pub fn count_elements(arr: Vec<i32>) -> i32 {
        let seen: HashSet<i32> = arr.iter().cloned().collect();
        arr.iter().filter(|&&x| seen.contains(&(x + 1))).count() as i32
    }
}
