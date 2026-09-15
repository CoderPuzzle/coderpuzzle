use std::collections::HashSet;

impl Solution {
    pub fn subarray_bitwise_ors(arr: Vec<i32>) -> i32 {
        let mut seen: HashSet<i32> = HashSet::new();
        // current: distinct OR values of subarrays ending at this index.
        let mut current: HashSet<i32> = HashSet::new();
        for &x in &arr {
            // Every subarray ending here is [x] alone or an old suffix OR
            // extended by x; OR never clears bits, so current stays small
            // (at most ~b+1 values for b-bit numbers).
            let mut nxt: HashSet<i32> = HashSet::with_capacity(current.len() + 1);
            for &y in &current {
                nxt.insert(x | y);
            }
            nxt.insert(x);
            current = nxt;
            seen.extend(current.iter().copied());
        }
        seen.len() as i32
    }
}
