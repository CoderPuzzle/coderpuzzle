impl Solution {
    pub fn reverse_pairs(nums: Vec<i32>) -> i32 {
        fn merge_count(arr: &[i64]) -> (Vec<i64>, i64) {
            if arr.len() <= 1 {
                return (arr.to_vec(), 0);
            }
            let mid = arr.len() / 2;
            let (left, c1) = merge_count(&arr[..mid]);
            let (right, c2) = merge_count(&arr[mid..]);
            // Pairs inside either half are already counted; only cross
            // pairs remain, and both halves come back sorted.
            let mut count = c1 + c2;
            // count cross reverse pairs: left[i] > 2 * right[j]
            // j never restarts: the next left[i] is at least as large, so
            // every right element already passed also qualifies — the
            // sweep is linear per merge level.
            let mut j = 0usize;
            for i in 0..left.len() {
                while j < right.len() && left[i] > 2 * right[j] {
                    j += 1;
                }
                count += j as i64;
            }
            // merge
            let mut merged: Vec<i64> = Vec::with_capacity(arr.len());
            let mut i = 0usize;
            let mut j = 0usize;
            while i < left.len() && j < right.len() {
                if left[i] <= right[j] {
                    merged.push(left[i]);
                    i += 1;
                } else {
                    merged.push(right[j]);
                    j += 1;
                }
            }
            merged.extend_from_slice(&left[i..]);
            merged.extend_from_slice(&right[j..]);
            (merged, count)
        }

        // Widen to i64: values reach both int32 extremes and 2 * value
        // would overflow.
        let arr: Vec<i64> = nums.iter().map(|&v| v as i64).collect();
        merge_count(&arr).1 as i32
    }
}
