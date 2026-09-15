impl Solution {
    pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
        // Keep `a` as the shorter array: smaller search space, and the
        // partner cut j is guaranteed to land inside [0, n].
        let (a, b) = if nums1.len() <= nums2.len() {
            (&nums1, &nums2)
        } else {
            (&nums2, &nums1)
        };
        let (m, n) = (a.len(), b.len());
        let total = m + n;
        let half = total / 2;
        let (mut lo, mut hi) = (0i64, m as i64);
        loop {
            // Binary-search the cut: i = elements `a` gives to the left
            // half; the cut in `b` is then forced by the half's size.
            let i = ((lo + hi) / 2) as usize;
            let j = half - i;
            // Sentinels make edge cuts well-defined: a cut at 0 or past the
            // end needs no special casing.
            let a_left = if i > 0 { a[i - 1] as i64 } else { i64::MIN };
            let a_right = if i < m { a[i] as i64 } else { i64::MAX };
            let b_left = if j > 0 { b[j - 1] as i64 } else { i64::MIN };
            let b_right = if j < n { b[j] as i64 } else { i64::MAX };
            // Both arrays are sorted, so comparing across the cut suffices:
            // everything on the left is <= everything on the right.
            if a_left <= b_right && b_left <= a_right {
                if total % 2 == 1 {
                    // Odd total: the left half was made the smaller side.
                    return a_right.min(b_right) as f64;
                }
                return (a_left.max(b_left) + a_right.min(b_right)) as f64 / 2.0;
            }
            if a_left > b_right {
                // `a` is contributing too many elements to the left half.
                hi = i as i64 - 1;
            } else {
                lo = i as i64 + 1;
            }
        }
    }
}
