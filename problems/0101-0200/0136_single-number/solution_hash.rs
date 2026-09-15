use std::collections::HashSet;

impl Solution {
    pub fn single_number(nums: Vec<i32>) -> i32 {
        // Parity hash set: the first sight of a value adds it, the second
        // removes it — a paired element erases its own trace, so the set
        // holds exactly the values seen an odd number of times.
        let mut seen: HashSet<i32> = HashSet::new();
        for value in nums {
            if !seen.remove(&value) {
                seen.insert(value);
            }
        }
        // Fold the odd-count survivors with XOR: even-count values cancel
        // in any XOR fold anyway, so this equals folding the whole array.
        let mut result = 0;
        for value in seen {
            result ^= value;
        }
        result
    }
}
