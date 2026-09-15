use std::collections::HashMap;

impl Solution {
    pub fn find_least_num_of_unique_ints(arr: Vec<i64>, k: i32) -> i32 {
        let mut counts: HashMap<i64, i32> = HashMap::new();
        for value in arr {
            *counts.entry(value).or_insert(0) += 1;
        }
        let mut freqs: Vec<i32> = counts.into_values().collect();
        freqs.sort();
        let mut k = k;
        let mut remaining = freqs.len() as i32;
        for count in freqs {
            if k >= count {
                k -= count;
                remaining -= 1;
            } else {
                break;
            }
        }
        remaining
    }
}
