class Solution {
  public:
    long long minimumTime(vector<int> &d, vector<int> &r) {
        // Least common multiple of the two recharge periods; dividing
        // before multiplying keeps the intermediate small.
        long long period = lcm(r[0], r[1]);
        // fits grows with t, so halve down to the smallest feasible
        // horizon; twice the combined load always suffices since periods
        // are >= 2.
        long long lo = 1, hi = 2LL * (d[0] + d[1]);
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (fits(mid, d[0], d[1], r[0], r[1], period)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

  private:
    bool fits(long long t, long long d0, long long d1, long long p1, long long p2, long long period) {
        // Hours each drone can work in: all t hours minus its recharge
        // hours (the multiples of its own period).
        long long c1 = t - t / p1;
        long long c2 = t - t / p2;
        // Hours open to at least one drone: everything except multiples of
        // both periods, which idle the two drones simultaneously.
        return d0 <= c1 && d1 <= c2 && d0 + d1 <= t - t / period;
    }

    long long gcd(long long x, long long y) {
        while (y != 0) {
            long long t = x % y;
            x = y;
            y = t;
        }
        return x;
    }

    long long lcm(long long x, long long y) { return x / gcd(x, y) * y; }
};
