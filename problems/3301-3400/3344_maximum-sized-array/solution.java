class Solution {

    public int maxSizedArray(long s) {
        // The total factors as M * T with M = n(n-1)/2 and T the per-bit
        // count of (j OR k) over all pairs; M*T <= s iff T <= s / M, which
        // avoids oversized products. The doubling stops at hi <= 2^14
        // (T >= sum of j over [n/2, n) pushes the total at 2^14 past
        // 10^15 >= s), and s <= 1e15 with T <= 2n*M < 4.4e12 keeps every
        // intermediate within long.
        int hi = 1;
        while (fits(hi, s)) {
            hi *= 2;
        }
        int lo = 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (fits(mid, s)) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo - 1;
    }

    // True when the total of the n x n x n array stays within s: compare
    // T against the floor of s / M instead of forming M * T.
    private boolean fits(int n, long s) {
        if (n <= 1) {
            return true;
        }
        long m = ((long) n * (n - 1)) / 2;
        long total = 0;
        for (int b = 0; 1 << b < 2 * n; b++) {
            long setCount = (n >> (b + 1)) << b;
            long rem = n & ((1 << (b + 1)) - 1);
            if (rem > 1 << b) {
                setCount += rem - (1 << b);
            }
            total += (1L << b) * ((long) n * n - (n - setCount) * (n - setCount));
        }
        return total <= s / m;
    }
}
