use std::collections::HashSet;

impl Solution {
    pub fn closest_to_target(arr: Vec<i32>, target: i32) -> i32 {
        // prev holds the distinct AND-values of every subarray ending at the
        // previous index. AND only clears bits, so this set stays small
        // (O(log(max(arr))) entries) and updates cheaply from one index to
        // the next.
        let mut best = (arr[0] - target).abs();
        let mut prev: HashSet<i32> = HashSet::new();
        prev.insert(arr[0]);
        for &value in arr.iter().skip(1) {
            let mut cur: HashSet<i32> = HashSet::new();
            cur.insert(value);
            for &p in prev.iter() {
                cur.insert(p & value);
            }
            for &v in cur.iter() {
                best = best.min((v - target).abs());
            }
            prev = cur;
        }
        best
    }
}
