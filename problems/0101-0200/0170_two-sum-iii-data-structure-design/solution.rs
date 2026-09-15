use std::collections::HashMap;

// Hash multiset: value -> occurrence count. add bumps a counter in O(1);
// find lazily scans the distinct values once, asking for each complement.
// Keys are widened to i64: `value - number` can exceed i32 when value sits
// near its ±2^31 bounds, and i32 subtraction would overflow-panic.
pub struct TwoSum {
    counts: HashMap<i64, i64>,
}

impl TwoSum {
    pub fn new() -> Self {
        TwoSum { counts: HashMap::new() }
    }

    pub fn add(&mut self, number: i32) {
        *self.counts.entry(number as i64).or_insert(0) += 1;
    }

    pub fn find(&mut self, value: i32) -> bool {
        let target = value as i64;
        for (&number, &count) in &self.counts {
            let complement = target - number;
            // A value that is its own complement needs two stored copies.
            if self.counts.contains_key(&complement) && (complement != number || count > 1) {
                return true;
            }
        }
        false
    }
}
