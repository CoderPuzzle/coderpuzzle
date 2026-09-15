impl Solution {
    pub fn reverse_pairs(nums: Vec<i32>) -> i32 {
        // Widen to i64: values reach both int32 extremes and 2 * value
        // would overflow.
        let mut vals: Vec<i64> = nums.iter().map(|&v| v as i64).collect();
        vals.sort();
        vals.dedup();
        // Fenwick over compressed ranks instead of merge-sort counting:
        // walk right-to-left, so by the time the walk reaches an entry the
        // tree holds exactly the entries to that entry's right. Values span
        // the full int32 range, so the ranks come from the sorted distinct
        // values, and their doubled selves ride beside them — x qualifies
        // against v exactly when 2 * v < x.
        let doubled: Vec<i64> = vals.iter().map(|&v| 2 * v).collect();
        let size = vals.len();
        let mut bit = vec![0i64; size + 1];

        fn update(bit: &mut [i64], size: usize, mut i: usize, delta: i64) {
            while i <= size {
                bit[i] += delta;
                i += i & i.wrapping_neg();
            }
        }
        fn query(bit: &[i64], mut i: usize) -> i64 {
            let mut total = 0;
            while i > 0 {
                total += bit[i];
                i -= i & i.wrapping_neg();
            }
            total
        }
        fn lower_bound(a: &[i64], target: i64) -> usize {
            let (mut lo, mut hi) = (0, a.len());
            while lo < hi {
                let mid = (lo + hi) / 2;
                if a[mid] < target {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            lo
        }

        // The tally is kept 64-bit alongside the widened comparisons.
        let mut count = 0i64;
        for &v in nums.iter().rev() {
            let x = v as i64;
            // Every held value with 2 * v < x ranks below the cut, so the
            // prefix query totals exactly the later entries x more than
            // doubles — and querying before inserting keeps x from counting
            // itself.
            count += query(&bit, lower_bound(&doubled, x));
            update(&mut bit, size, lower_bound(&vals, x) + 1, 1);
        }
        count as i32
    }
}
