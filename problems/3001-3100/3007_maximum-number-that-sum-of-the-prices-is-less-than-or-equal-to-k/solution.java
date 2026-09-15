class Solution {

    public long findMaximumNumber(long k, int x) {
        // The accumulated price is nondecreasing in n, so the answer is the
        // largest n with priceSum(n) <= k. First double hi until it is expensive.
        long lo = 0,
            hi = 10_000_000_000_000_000L;
        while (priceSum(hi, x) <= k) {
            hi *= 2;
        }
        // Invariant: lo is cheap, hi is expensive; lo ends as the answer.
        while (lo + 1 < hi) {
            long mid = (lo + hi) / 2;
            if (priceSum(mid, x) <= k) {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    // Accumulated price of n: for each watched bit position p = x, 2x, ...,
    // count how many numbers in [1, n] have bit p-1 set.
    private long priceSum(long n, int x) {
        long total = 0;
        int p = x;
        // Positions with 2^(p-1) > n contribute nothing, so stop there.
        while (1L << (p - 1) <= n) {
            long b = p - 1;
            // Bit b alternates in blocks of 2^b set / 2^b clear: count full
            // cycles plus the partial one over the first n+1 values.
            long cycle = 1L << (b + 1);
            long full = (n + 1) / cycle;
            long rem = (n + 1) % cycle;
            long half = 1L << b;
            total += full * half + Math.max(0, rem - half);
            p += x;
        }
        return total;
    }
}
