impl Solution {
    pub fn max_value(n: i32, index: i32, max_sum: i32) -> i32 {
        // Binary-search the peak m = nums[index]. Any valid array with that
        // peak has nums[i] >= max(m - |i - index|, 1) everywhere, and the
        // array that sits exactly on those bounds is itself valid, so its
        // sum decides feasibility and grows strictly with m. Probing m up
        // to maxSum = 10^9 makes side sums reach ~5*10^17, past 32 bits,
        // so the search and both side sums run on i64.
        fn side(m: i64, width: i64) -> i64 {
            if width >= m {
                m * (m - 1) / 2 + width - (m - 1)
            } else {
                width * m - width * (width + 1) / 2
            }
        }
        let (n, index, max_sum) = (n as i64, index as i64, max_sum as i64);
        let (mut lo, mut hi) = (1, max_sum);
        while lo < hi {
            let mid = lo + (hi - lo + 1) / 2;
            if mid + side(mid, index) + side(mid, n - 1 - index) <= max_sum {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo as i32
    }
}
