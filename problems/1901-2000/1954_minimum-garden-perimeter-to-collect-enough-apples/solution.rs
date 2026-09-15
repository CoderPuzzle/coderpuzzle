impl Solution {
    pub fn minimum_perimeter(needed_apples: i64) -> i32 {
        // A square plot with half-side k covers the integer coordinates
        // [-k,k]^2. Summing |i| + |j| over that box gives
        // apples(k) = 2k(k+1)(2k+1); the answer is 8k for the smallest k with
        // apples(k) >= needed_apples. needed_apples <= 1e15 implies
        // k <= 63000, keeping every intermediate within i64.
        let apples = |k: i64| 2 * k * (k + 1) * (2 * k + 1);
        let (mut lo, mut hi) = (1i64, 1i64);
        while apples(hi) < needed_apples {
            hi *= 2;
        }
        while lo < hi {
            let mid = (lo + hi) / 2;
            if apples(mid) >= needed_apples {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        (8 * lo) as i32
    }
}
