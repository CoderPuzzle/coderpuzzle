impl Solution {
    pub fn number_of_pairs(nums1: Vec<i32>, nums2: Vec<i32>, diff: i32) -> i64 {
        let n = nums1.len();
        let mut values: Vec<i64> = Vec::with_capacity(n);
        for i in 0..n {
            values.push(nums1[i] as i64 - nums2[i] as i64);
        }
        let mut count = 0i64;
        fn merge_sort(values: &mut [i64], diff: i64, count: &mut i64, lo: usize, hi: usize) {
            if hi - lo < 2 {
                return;
            }
            let mid = (lo + hi) / 2;
            merge_sort(values, diff, count, lo, mid);
            merge_sort(values, diff, count, mid, hi);
            let left: Vec<i64> = values[lo..mid].to_vec();
            let mut p = 0; // left values at or below the running bound
            for j in mid..hi {
                while p < left.len() && left[p] <= values[j] + diff {
                    p += 1;
                }
                *count += p as i64; // each admitted left value pairs with this right element
            }
            let (mut i, mut j, mut k) = (0, mid, lo);
            while i < left.len() && j < hi {
                if left[i] <= values[j] {
                    // equal: the left element places first
                    values[k] = left[i];
                    i += 1;
                } else {
                    values[k] = values[j];
                    j += 1;
                }
                k += 1;
            }
            while i < left.len() {
                values[k] = left[i];
                i += 1;
                k += 1;
            }
        }
        merge_sort(&mut values, diff as i64, &mut count, 0, n);
        count
    }
}
