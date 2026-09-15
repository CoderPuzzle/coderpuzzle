use std::collections::HashMap;

impl Solution {
    pub fn longest_wpi(hours: Vec<i32>) -> i32 {
        // earliest index each prefix value has been seen; {0: -1} lets
        // intervals starting at index 0 be handled uniformly
        let mut first: HashMap<i32, i32> = HashMap::new();
        first.insert(0, -1);
        let mut prefix = 0i32;
        let mut best = 0i32;
        for (i, &hours_day) in hours.iter().enumerate() {
            // tiring day scores +1, other -1: a well-performing interval is
            // exactly a subarray whose sum is strictly positive
            prefix += if hours_day > 8 { 1 } else { -1 };
            if prefix > 0 {
                // the whole prefix hours[0..i] is already well-performing
                best = i as i32 + 1;
            } else if let Some(&j) = first.get(&(prefix - 1)) {
                // cut just after the earliest prefix-1: the remainder sums to
                // exactly 1, and since steps are unit-sized no longer interval
                // can end at i
                best = best.max(i as i32 - j);
            }
            // or_insert records only the first sighting so stored indices stay leftmost
            first.entry(prefix).or_insert(i as i32);
        }
        best
    }
}
