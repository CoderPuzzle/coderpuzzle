impl Solution {
    pub fn find_kth_positive(arr: Vec<i32>, k: i32) -> i32 {
        let n = arr.len();
        // A gapless array would have arr[i] = i + 1, so missing(i) counts
        // the positive integers absent up through arr[i]; it is
        // non-decreasing.
        let missing = |i: usize| arr[i] - (i as i32 + 1);
        // Smallest index whose missing count reaches k; hi = n lets the
        // search converge past the end when the whole array falls short.
        let (mut lo, mut hi) = (0usize, n);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if missing(mid) < k {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        // Every index before lo accounts for fewer than k missing numbers,
        // so the kth missing positive is exactly k past that point.
        lo as i32 + k
    }
}
