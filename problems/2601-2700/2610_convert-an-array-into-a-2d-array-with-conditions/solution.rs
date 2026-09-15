use std::collections::HashMap;

impl Solution {
    pub fn find_matrix(nums: Vec<i32>) -> Vec<Vec<i32>> {
        // A value's k-th occurrence (counted from zero) always belongs to row
        // k: each row must hold distinct elements, so earlier copies can only
        // have occupied strictly earlier rows. Appending there therefore never
        // duplicates within a row, the rows stay minimal because one opens only
        // when a repeat forces a deeper level, and scanning in input order
        // keeps the construction fully deterministic.
        let mut seen: HashMap<i32, usize> = HashMap::new();
        let mut rows: Vec<Vec<i32>> = Vec::new();
        for value in nums {
            let rank = *seen.get(&value).unwrap_or(&0);
            seen.insert(value, rank + 1);
            if rank == rows.len() {
                rows.push(Vec::new());
            }
            rows[rank].push(value);
        }
        rows
    }
}
