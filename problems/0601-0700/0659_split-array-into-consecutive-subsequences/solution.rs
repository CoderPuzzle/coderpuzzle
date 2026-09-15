use std::collections::HashMap;

impl Solution {
    pub fn is_possible(nums: Vec<i32>) -> bool {
        // One walk over the sorted array with two counter maps: left[v] is
        // the copies of v not yet placed, need[v] the subsequences whose
        // next wanted value is v. Placing x always prefers extending an
        // existing subsequence over starting a new one.
        let mut left: HashMap<i32, i32> = HashMap::new();
        let mut need: HashMap<i32, i32> = HashMap::new();
        for &x in &nums {
            *left.entry(x).or_insert(0) += 1;
        }
        for &x in &nums {
            if left.get(&x).copied().unwrap_or(0) == 0 {
                // consumed by a run started earlier as its x+1/x+2
                continue;
            }
            if need.get(&x).copied().unwrap_or(0) > 0 {
                // extend: the run that wanted x now wants x + 1
                *left.entry(x).or_insert(0) -= 1;
                *need.entry(x).or_insert(0) -= 1;
                *need.entry(x + 1).or_insert(0) += 1;
            } else if left.get(&(x + 1)).copied().unwrap_or(0) > 0 && left.get(&(x + 2)).copied().unwrap_or(0) > 0 {
                // start a run of three: it eats the next two values ahead
                // of the walk and then wants x + 3
                *left.entry(x).or_insert(0) -= 1;
                *left.entry(x + 1).or_insert(0) -= 1;
                *left.entry(x + 2).or_insert(0) -= 1;
                *need.entry(x + 3).or_insert(0) += 1;
            } else {
                // x can neither extend a run nor seed a legal new one
                return false;
            }
        }
        true
    }
}
