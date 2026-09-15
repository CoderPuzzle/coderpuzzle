class Solution {
    long long zeta(long long x) {
        // Trailing zeroes of x! come from factors of 5 (2s are
        // plentiful): each multiple of p = 5, 25, 125, ... adds one.
        long long count = 0;
        long long p = 5;
        while (p <= x) {
            count += x / p;
            p *= 5;
        }
        return count;
    }

  public:
    int preimageSizeFZF(int k) {
        // zeta is nondecreasing, so bisect for the smallest x with
        // zeta(x) >= k; zeta(5*(k+1)) >= k+1 makes this bound safe.
        long long lo = 0;
        long long hi = 5LL * (k + 1) + 10;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (zeta(mid) < k) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        // Each block 5m..5m+4 shares one zeta value, so an achieved k
        // has exactly five preimages; a k skipped at a multiple of 25
        // has none.
        return zeta(lo) == k ? 5 : 0;
    }
};
