class Solution {
  public:
    int maxSizedArray(long long s) {
        // The total factors as M * T with M = n(n-1)/2 and T the per-bit
        // count of (j OR k) over all pairs; M*T <= s iff T <= s / M, which
        // avoids oversized products. The doubling stops at hi <= 2^14
        // (T >= sum of j over [n/2, n) pushes the total at 2^14 past
        // 1e15 >= s), and s <= 1e15 with T <= 2n*M < 4.4e12 keeps every
        // intermediate within long long.
        auto fits = [&](int n) {
            if (n <= 1) {
                return true;
            }
            long long m = (long long)n * (n - 1) / 2;
            long long total = 0;
            for (int b = 0; (1 << b) < 2 * n; b++) {
                long long setCount = (n >> (b + 1)) << b;
                long long rem = n & ((1 << (b + 1)) - 1);
                if (rem > (1 << b)) {
                    setCount += rem - (1 << b);
                }
                total += (1LL << b) * ((long long)n * n - (n - setCount) * (n - setCount));
            }
            return total <= s / m;
        };
        int hi = 1;
        while (fits(hi))
            hi *= 2;
        int lo = 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (fits(mid)) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo - 1;
    }
};
