impl Solution {
    pub fn minimize_set(divisor1: i32, divisor2: i32, unique_cnt1: i32, unique_cnt2: i32) -> i32 {
        // Binary search the smallest feasible maximum m. For a candidate m:
        //   m - m/d1 numbers arr1 can take, m - m/d2 for arr2, and
        //   m - m/lcm blocked by neither; 64-bit math since the lcm and the
        //   search bound can pass 2^31.
        let gcd = |mut a: i64, mut b: i64| -> i64 {
            while b != 0 {
                let t = a % b;
                a = b;
                b = t;
            }
            a
        };
        let d1 = divisor1 as i64;
        let d2 = divisor2 as i64;
        let c1 = unique_cnt1 as i64;
        let c2 = unique_cnt2 as i64;
        let total = c1 + c2;
        let shared = d1 / gcd(d1, d2) * d2;
        let feasible = |m: i64| -> bool { m - m / d1 >= c1 && m - m / d2 >= c2 && m - m / shared >= total };
        let (mut lo, mut hi) = (1i64, 2 * total);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if feasible(mid) {
                hi = mid
            } else {
                lo = mid + 1
            }
        }
        lo as i32
    }
}
