class Solution {
  public:
    int minimizeSet(int divisor1, int divisor2, int uniqueCnt1, int uniqueCnt2) {
        // Binary search the smallest feasible maximum m. For a candidate m:
        //   m - m/d1 numbers arr1 can take, m - m/d2 for arr2, and
        //   m - m/lcm blocked by neither; 64-bit math since the lcm and the
        //   search bound can pass 2^31.
        long long total = (long long)uniqueCnt1 + uniqueCnt2;
        long long shared = 1LL * divisor1 / gcd(divisor1, divisor2) * divisor2;
        auto feasible = [&](long long m) {
            return m - m / divisor1 >= uniqueCnt1 && m - m / divisor2 >= uniqueCnt2 && m - m / shared >= total;
        };
        long long lo = 1, hi = 2 * total;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (feasible(mid))
                hi = mid;
            else
                lo = mid + 1;
        }
        return (int)lo;
    }

  private:
    static long long gcd(long long a, long long b) {
        while (b != 0) {
            long long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
};
