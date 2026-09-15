use std::collections::HashMap;

impl Solution {
    pub fn distance(nums: Vec<i32>) -> Vec<i64> {
        // Only equal values interact, so bucket indices by value; each bucket
        // is an independent 1-D problem over its sorted occurrence list.
        let mut pos: HashMap<i32, Vec<usize>> = HashMap::new();
        for (i, &x) in nums.iter().enumerate() {
            pos.entry(x).or_default().push(i);
        }
        let mut arr: Vec<i64> = vec![0; nums.len()];
        for idxs in pos.values() {
            let m = idxs.len();
            // Prefix sums of the occurrence indices turn every distance total
            // into O(1) arithmetic — vital since one value may dominate.
            let mut prefix: Vec<i64> = vec![0; m + 1];
            for j in 0..m {
                prefix[j + 1] = prefix[j] + idxs[j] as i64;
            }
            for j in 0..m {
                let i = idxs[j] as i64;
                // j earlier occurrences each at distance i - idx, then
                // m - 1 - j later ones each at distance idx - i:
                let left = i * j as i64 - prefix[j];
                let right = (prefix[m] - prefix[j + 1]) - i * (m as i64 - 1 - j as i64);
                arr[idxs[j]] = left + right;
            }
        }
        arr
    }
}
