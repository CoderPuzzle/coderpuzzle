impl Solution {
    pub fn max_chunks_to_sorted(arr: Vec<i32>) -> i32 {
        // A boundary is legal exactly when the prefix's largest entry is
        // no greater than every entry after the cut — non-strict, which
        // is what keeps repeated values legal at equal boundaries.
        let mut suffix_min = arr.clone();
        for i in (0..arr.len() - 1).rev() {
            suffix_min[i] = suffix_min[i].min(suffix_min[i + 1]);
        }
        let mut blocks = 1;
        let mut prefix_max = arr[0];
        for i in 1..arr.len() {
            // The prefix holds the smallest i+1 entries exactly when its
            // running maximum does not exceed the suffix minimum.
            if prefix_max <= suffix_min[i] {
                blocks += 1;
            }
            prefix_max = prefix_max.max(arr[i]);
        }
        blocks
    }
}
