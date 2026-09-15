impl Solution {
    // Counts, for every index, how many strictly smaller values sit
    // before it, walking one Fenwick tree over the value range.
    fn smaller_counts(values: &[i32]) -> Vec<i32> {
        let bound = *values.iter().max().unwrap() as usize;
        let mut tree = vec![0i32; bound + 1];
        let mut counts = vec![0i32; values.len()];
        for (i, &value) in values.iter().enumerate() {
            let mut j = value as usize - 1;
            while j > 0 {
                counts[i] += tree[j];
                j -= j & j.wrapping_neg();
            }
            let mut j = value as usize;
            while j <= bound {
                tree[j] += 1;
                j += j & j.wrapping_neg();
            }
        }
        counts
    }

    pub fn k_big_indices(nums: Vec<i32>, k: i32) -> i32 {
        // Two Fenwick sweeps over the value range answer, for every index,
        // how many strictly smaller values sit on each side: a forward pass
        // fills the left counts and a backward pass reruns the helper on a
        // fresh tree for the right ones. An index is k-big exactly when
        // both counts reach k.
        let left = Self::smaller_counts(&nums);
        let mut reversed = nums.clone();
        reversed.reverse();
        let right = Self::smaller_counts(&reversed);
        let n = nums.len();
        let mut big = 0;
        for i in 0..n {
            if left[i] >= k && right[n - 1 - i] >= k {
                big += 1;
            }
        }
        big
    }
}
