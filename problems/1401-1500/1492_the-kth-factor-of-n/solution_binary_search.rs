impl Solution {
    pub fn kth_factor(n: i32, k: i32) -> i32 {
        let n = n as i64;
        let k = k as i64;
        // Count divisors of n up to m by pairing d with n / d.
        let count_at_most = |m: i64| -> i64 {
            let mut count = 0i64;
            let mut d = 1i64;
            while d * d <= n {
                if n % d == 0 {
                    if d <= m {
                        count += 1;
                    }
                    let complement = n / d;
                    if complement != d && complement <= m {
                        count += 1;
                    }
                }
                d += 1;
            }
            count
        };
        let mut lo = 1i64;
        let mut hi = n;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if count_at_most(mid) >= k {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        if count_at_most(lo) >= k {
            lo as i32
        } else {
            -1
        }
    }
}
