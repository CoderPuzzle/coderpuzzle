use std::collections::HashSet;

impl Solution {
    pub fn check_if_exist(arr: Vec<i32>) -> bool {
        // Insert after the lookup so an element can never match itself.
        let mut seen: HashSet<i32> = HashSet::new();
        for value in arr {
            if seen.contains(&(2 * value)) || (value % 2 == 0 && seen.contains(&(value / 2))) {
                return true;
            }
            seen.insert(value);
        }
        false
    }
}
