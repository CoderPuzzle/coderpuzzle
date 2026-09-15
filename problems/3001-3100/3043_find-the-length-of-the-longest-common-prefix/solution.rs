use std::collections::HashSet;

impl Solution {
    pub fn longest_common_prefix(arr1: Vec<i32>, arr2: Vec<i32>) -> i32 {
        // A shared prefix of length L means the first L decimal digits agree,
        // so collect every decimal prefix of arr1 into a set.
        let mut prefixes: HashSet<i32> = HashSet::new();
        for &x in &arr1 {
            let mut v: i32 = 0;
            // Fold digits left to right; each intermediate v is one prefix of x.
            for c in x.to_string().bytes() {
                v = v * 10 + (c - b'0') as i32;
                prefixes.insert(v);
            }
        }
        let mut best: i32 = 0;
        for &y in &arr2 {
            let mut v: i32 = 0;
            let mut len: i32 = 0;
            for c in y.to_string().bytes() {
                v = v * 10 + (c - b'0') as i32;
                len += 1;
                if prefixes.contains(&v) {
                    if len > best {
                        best = len;
                    }
                } else {
                    // Prefixes nest: once one length of y misses, no longer
                    // prefix of y can match either.
                    break;
                }
            }
        }
        best
    }
}
