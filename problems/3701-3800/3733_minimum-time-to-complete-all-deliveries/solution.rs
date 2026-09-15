impl Solution {
    pub fn minimum_time(d: Vec<i32>, r: Vec<i32>) -> i64 {
        // Least common multiple of the two recharge periods; dividing
        // before multiplying keeps the intermediate small.
        let period = Self::lcm(r[0] as i64, r[1] as i64);
        // fits grows with t, so halve down to the smallest feasible
        // horizon; twice the combined load always suffices since periods
        // are >= 2.
        let (mut lo, mut hi) = (1i64, 2 * (d[0] as i64 + d[1] as i64));
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if Self::fits(mid, d[0] as i64, d[1] as i64, r[0] as i64, r[1] as i64, period) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }

    fn fits(t: i64, d0: i64, d1: i64, p1: i64, p2: i64, period: i64) -> bool {
        // Hours each drone can work in: all t hours minus its recharge
        // hours (the multiples of its own period).
        let c1 = t - t / p1;
        let c2 = t - t / p2;
        // Hours open to at least one drone: everything except multiples of
        // both periods, which idle the two drones simultaneously.
        d0 <= c1 && d1 <= c2 && d0 + d1 <= t - t / period
    }

    fn gcd(mut x: i64, mut y: i64) -> i64 {
        while y != 0 {
            let t = x % y;
            x = y;
            y = t;
        }
        x
    }

    fn lcm(x: i64, y: i64) -> i64 {
        x / Self::gcd(x, y) * y
    }
}
