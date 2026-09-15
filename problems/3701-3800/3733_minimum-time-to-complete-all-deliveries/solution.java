class Solution {

    public long minimumTime(int[] d, int[] r) {
        long period = lcm(r[0], r[1]);
        // fits grows with t, so halve down to the smallest feasible
        // horizon; twice the combined load always suffices since periods
        // are >= 2.
        long lo = 1,
            hi = 2L * (d[0] + d[1]);
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (fits(mid, d[0], d[1], r[0], r[1], period)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean fits(long t, long d0, long d1, long p1, long p2, long period) {
        // Hours each drone can work in: all t hours minus its recharge
        // hours (the multiples of its own period).
        long c1 = t - t / p1;
        long c2 = t - t / p2;
        // Hours open to at least one drone: everything except multiples of
        // both periods, which idle the two drones simultaneously.
        return d0 <= c1 && d1 <= c2 && d0 + d1 <= t - t / period;
    }

    private long gcd(long x, long y) {
        while (y != 0) {
            long t = x % y;
            x = y;
            y = t;
        }
        return x;
    }

    private long lcm(long x, long y) {
        return (x / gcd(x, y)) * y;
    }
}
