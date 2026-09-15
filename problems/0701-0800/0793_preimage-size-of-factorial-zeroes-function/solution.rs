impl Solution {
    fn zeta(x: i64) -> i64 {
        // Trailing zeroes of x! come from factors of 5 (2s are
        // plentiful): each multiple of p = 5, 25, 125, ... adds one.
        let mut count = 0i64;
        let mut p = 5i64;
        while p <= x {
            count += x / p;
            p *= 5;
        }
        count
    }

    pub fn preimage_size_f_z_f(k: i32) -> i32 {
        let k = k as i64;
        // zeta is nondecreasing, so bisect for the smallest x with
        // zeta(x) >= k; zeta(5*(k+1)) >= k+1 makes this bound safe.
        let mut lo = 0i64;
        let mut hi = 5 * (k + 1) + 10;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if Self::zeta(mid) < k {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        // Each block 5m..5m+4 shares one zeta value, so an achieved k
        // has exactly five preimages; a k skipped at a multiple of 25
        // has none.
        if Self::zeta(lo) == k {
            5
        } else {
            0
        }
    }
}
