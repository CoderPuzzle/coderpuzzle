class Solution {
  public:
    long long findMaximumNumber(long long k, int x) {
        // The accumulated price is nondecreasing in n, so the answer is the
        // largest n with priceSum(n) <= k. First double hi until it is expensive.
        long long lo = 0, hi = 10000000000000000LL;
        while (priceSum(hi, x) <= k) {
            hi *= 2;
        }
        // Invariant: lo is cheap, hi is expensive; lo ends as the answer.
        while (lo + 1 < hi) {
            long long mid = (lo + hi) / 2;
            if (priceSum(mid, x) <= k) {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

  private:
    // Accumulated price of n: for each watched bit position p = x, 2x, ...,
    // count how many numbers in [1, n] have bit p-1 set.
    long long priceSum(long long n, int x) {
        long long total = 0;
        int p = x;
        // Positions with 2^(p-1) > n contribute nothing, so stop there.
        while ((1LL << (p - 1)) <= n) {
            long long b = p - 1;
            // Bit b alternates in blocks of 2^b set / 2^b clear: count full
            // cycles plus the partial one over the first n+1 values.
            long long cycle = 1LL << (b + 1);
            long long full = (n + 1) / cycle;
            long long rem = (n + 1) % cycle;
            long long half = 1LL << b;
            long long extra = rem - half;
            if (extra < 0)
                extra = 0;
            total += full * half + extra;
            p += x;
        }
        return total;
    }
};
