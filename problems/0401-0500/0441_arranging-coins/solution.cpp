class Solution {
  public:
    int arrangeCoins(int n) {
        // The answer is the largest k whose triangular total T(k) = k*(k+1)/2
        // fits inside n (rows 1..k cost 1+2+...+k coins, and the leftover
        // coins cannot finish row k+1). T is strictly increasing, so the
        // predicate T(mid) <= n is monotone: binary search the boundary, and
        // hi ends on the largest row count that fits. The first probes
        // multiply two numbers near n/2, so the search runs in long long:
        // the product peaks near 1.2e18, beyond int range but inside 64
        // bits.
        long long lo = 1;
        long long hi = n;
        while (lo <= hi) {
            long long mid = (lo + hi) / 2;
            if (mid * (mid + 1) / 2 <= n) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return int(hi);
    }
};
