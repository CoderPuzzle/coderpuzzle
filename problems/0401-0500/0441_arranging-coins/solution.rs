impl Solution {
    pub fn arrange_coins(n: i32) -> i32 {
        // The answer is the largest k whose triangular total T(k) = k*(k+1)/2
        // fits inside n (rows 1..k cost 1+2+...+k coins, and the leftover
        // coins cannot finish row k+1). T is strictly increasing, so the
        // predicate T(mid) <= n is monotone: binary search the boundary, and
        // hi ends on the largest row count that fits. The first probes
        // multiply two numbers near n/2, so the search runs in i64: the
        // product peaks near 1.2e18, beyond i32 range but inside 64 bits.
        let n = n as i64;
        let mut lo = 1i64;
        let mut hi = n;
        while lo <= hi {
            let mid = (lo + hi) / 2;
            if mid * (mid + 1) / 2 <= n {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        hi as i32
    }
}
