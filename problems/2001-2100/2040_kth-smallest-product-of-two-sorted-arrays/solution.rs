impl Solution {
    pub fn kth_smallest_product(nums1: Vec<i32>, nums2: Vec<i32>, k: i64) -> i64 {
        fn floor_div(a: i64, b: i64) -> i64 {
            let mut q = a / b;
            let r = a % b;
            if r != 0 && ((r < 0) != (b < 0)) {
                q -= 1;
            }
            q
        }
        // number of elements <= t
        fn upper_bound(a: &[i32], t: i64) -> usize {
            let (mut lo, mut hi) = (0usize, a.len());
            while lo < hi {
                let mid = (lo + hi) / 2;
                if (a[mid] as i64) <= t {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            lo
        }
        // number of elements < t
        fn lower_bound(a: &[i32], t: i64) -> usize {
            let (mut lo, mut hi) = (0usize, a.len());
            while lo < hi {
                let mid = (lo + hi) / 2;
                if (a[mid] as i64) < t {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            lo
        }
        let count_le = |v: i64| -> i64 {
            let mut cnt: i64 = 0;
            let n2 = nums2.len() as i64;
            for &x in &nums1 {
                if x > 0 {
                    // x * y <= v  ->  y <= floor(v / x)
                    cnt += upper_bound(&nums2, floor_div(v, x as i64)) as i64;
                } else if x < 0 {
                    // x * y <= v, x < 0  ->  y >= ceil(v / x)
                    cnt += n2 - lower_bound(&nums2, -floor_div(-v, x as i64)) as i64;
                } else {
                    // x == 0: product is 0
                    if v >= 0 {
                        cnt += n2;
                    }
                }
            }
            cnt
        };

        let mut lo: i64 = -10_000_000_000 - 1;
        let mut hi: i64 = 10_000_000_000 + 1;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if count_le(mid) >= k {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
