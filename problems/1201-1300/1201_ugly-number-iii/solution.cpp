class Solution {
  public:
    long long nthUglyNumber(int n, int a, int b, int c) {
        long long ab = lcm(a, b), ac = lcm(a, c), bc = lcm(b, c);
        long long abc = lcm(ab, c);
        // count(x) is non-decreasing, so binary search the smallest x with
        // count(x) >= n — that x is itself ugly; hi is the answer ceiling
        long long lo = 1, hi = 2000000000LL;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (count(mid, a, b, c, ab, ac, bc, abc) >= n)
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }

  private:
    long long count(long long x, long long a, long long b, long long c, long long ab, long long ac, long long bc,
                    long long abc) {
        // ugly numbers <= x via inclusion-exclusion: add each divisor's
        // multiples, subtract the pairwise lcms (counted twice), add
        // back the triple lcm
        return x / a + x / b + x / c - x / ab - x / ac - x / bc + x / abc;
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
