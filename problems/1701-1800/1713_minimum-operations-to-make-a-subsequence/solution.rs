use std::collections::HashMap;

impl Solution {
    pub fn min_operations(target: Vec<i32>, arr: Vec<i32>) -> i32 {
        // Answer = target.len() - LCS: each target element not kept costs
        // one insertion. target has distinct values, so rewriting arr as
        // target indices turns the LCS into a longest strictly increasing run.
        let mut index: HashMap<i32, usize> = HashMap::with_capacity(target.len() * 2);
        for (i, &v) in target.iter().enumerate() {
            index.insert(v, i);
        }
        // Patience sorting: tails[k] = smallest tail of an increasing
        // subsequence of length k+1; the lower-bound search keeps it strictly
        // increasing (duplicate arr values map to one index and replace).
        let mut tails: Vec<usize> = Vec::with_capacity(arr.len());
        for &value in &arr {
            // Absent values never join a common subsequence and may stay.
            let v = match index.get(&value) {
                Some(&v) => v,
                None => continue,
            };
            let mut lo = 0usize;
            let mut hi = tails.len();
            while lo < hi {
                let mid = (lo + hi) / 2;
                if tails[mid] < v {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            if lo == tails.len() {
                tails.push(v);
            } else {
                tails[lo] = v;
            }
        }
        (target.len() - tails.len()) as i32
    }
}
