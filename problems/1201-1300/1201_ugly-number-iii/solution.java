class Solution {

    public long nthUglyNumber(int n, int a, int b, int c) {
        long ab = lcm(a, b),
            ac = lcm(a, c),
            bc = lcm(b, c);
        long abc = lcm(ab, c);
        // count(x) is non-decreasing, so binary search the smallest x with
        // count(x) >= n — that x is itself ugly; hi is the answer ceiling
        long lo = 1,
            hi = 2000000000L;
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (count(mid, a, b, c, ab, ac, bc, abc) >= n) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private long count(long x, long a, long b, long c, long ab, long ac, long bc, long abc) {
        // ugly numbers <= x via inclusion-exclusion: add each divisor's
        // multiples, subtract the pairwise lcms (counted twice), add
        // back the triple lcm
        return x / a + x / b + x / c - x / ab - x / ac - x / bc + x / abc;
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
