class Solution {

    public long maxProduct(int[] nums) {
        // Every value fits in 20 bits, so each number doubles as its own
        // bitmask; "no common set bits" means the partner's mask is a
        // subset of this mask's complement within those 20 bits.
        int width = 1;
        for (int v : nums) {
            int w = 0;
            for (int x = v; x > 0; x >>= 1) {
                w++;
            }
            if (w > width) {
                width = w;
            }
        }
        int size = 1 << width;
        // dp[m] starts as the largest value whose set bits are exactly m
        // (0 when no element carries mask m).
        int[] dp = new int[size];
        for (int v : nums) {
            if (v > dp[v]) {
                dp[v] = v;
            }
        }
        // Subset-max sweep: a mask holding bit b absorbs its b-cleared
        // twin; afterwards dp[m] is the largest value whose set bits are
        // a subset of m.
        for (int b = 0; b < width; b++) {
            for (int m = 0; m < size; m++) {
                if ((m & (1 << b)) != 0 && dp[m ^ (1 << b)] > dp[m]) {
                    dp[m] = dp[m ^ (1 << b)];
                }
            }
        }
        // A disjoint partner of v must carry a mask that is a subset of
        // FULL ^ mv, so dp holds the best partner directly. Products
        // reach 10^12, hence long.
        int full = size - 1;
        long best = 0;
        for (int v : nums) {
            long prod = (long) v * dp[full ^ v];
            if (prod > best) {
                best = prod;
            }
        }
        return best;
    }
}
