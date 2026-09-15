impl Solution {
    pub fn max_sized_array(s: i64) -> i32 {
        // The total factors as M * T with M = n(n-1)/2 and T the per-bit
        // count of (j OR k) over all pairs; M*T <= s iff T <= s / M, which
        // avoids oversized products. The doubling stops at hi <= 2^14
        // (T >= sum of j over [n/2, n) pushes the total at 2^14 past
        // 1e15 >= s), and s <= 1e15 with T <= 2n*M < 4.4e12 keeps every
        // intermediate within i64.
        let fits = |n: i32| -> bool {
            if n <= 1 {
                return true;
            }
            let m = (n as i64 * (n - 1) as i64) / 2;
            let mut total: i64 = 0;
            let mut b = 0;
            while (1i64 << b) < 2 * n as i64 {
                let mut set_count = ((n >> (b + 1)) << b) as i64;
                let rem = (n & ((1 << (b + 1)) - 1)) as i64;
                if rem > (1i64 << b) {
                    set_count += rem - (1i64 << b);
                }
                let cleared = n as i64 - set_count;
                total += (1i64 << b) * (n as i64 * n as i64 - cleared * cleared);
                b += 1;
            }
            total <= s / m
        };
        let mut hi = 1i32;
        while fits(hi) {
            hi *= 2;
        }
        let mut lo = 1i32;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if fits(mid) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        lo - 1
    }
}
