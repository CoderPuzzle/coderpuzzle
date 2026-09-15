class Solution {

    public int mySqrt(int x) {
        // Binary search for the largest m with m * m <= x: the predicate is
        // monotone (past the root, every square overshoots), so halving the
        // candidate interval lands exactly on the rounded-down square root.
        // 64-bit bounds and midpoint: near x = 2^31 - 1 the probes climb
        // toward x itself, and mid * mid reaches ~2^62, far past 32 bits.
        long low = 0,
            high = x;
        while (low < high) {
            // Round the midpoint up: with a plain floor the interval can stop
            // shrinking when low == mid, and the loop would never terminate.
            long mid = low + (high - low + 1) / 2;
            if (mid * mid <= x) {
                low = mid;
            } else {
                high = mid - 1;
            }
        }
        return (int) low;
    }
}
