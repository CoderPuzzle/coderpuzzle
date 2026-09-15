impl Solution {
    pub fn find_maximum_number(k: i64, x: i32) -> i64 {
        let x = x as u32;
        // The accumulated price is nondecreasing in n, so the answer is the
        // largest n with price_sum(n) <= k. First double hi until it is expensive.
        let mut lo: i64 = 0;
        let mut hi: i64 = 10_000_000_000_000_000;
        while Self::price_sum(hi, x) <= k {
            hi *= 2;
        }
        // Invariant: lo is cheap, hi is expensive; lo ends as the answer.
        while lo + 1 < hi {
            let mid = (lo + hi) / 2;
            if Self::price_sum(mid, x) <= k {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        lo
    }

    // Accumulated price of n: for each watched bit position p = x, 2x, ...,
    // count how many numbers in [1, n] have bit p-1 set.
    fn price_sum(n: i64, x: u32) -> i64 {
        let mut total: i64 = 0;
        let mut p = x;
        // Positions with 2^(p-1) > n contribute nothing, so stop there.
        while ((1i64) << (p - 1)) <= n {
            let b = p - 1;
            // Bit b alternates in blocks of 2^b set / 2^b clear: count full
            // cycles plus the partial one over the first n+1 values.
            let cycle = 1i64 << (b + 1);
            let full = (n + 1) / cycle;
            let rem = (n + 1) % cycle;
            let half = 1i64 << b;
            let extra = (rem - half).max(0);
            total += full * half + extra;
            p += x;
        }
        total
    }
}
