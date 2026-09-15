class Solution {
  public:
    long long maxProduct(vector<int> &nums) {
        // Every value fits in 20 bits, so each number doubles as its own
        // bitmask; "no common set bits" means the partner's mask is a
        // subset of this mask's complement within those 20 bits.
        int width = 1;
        for (int v : nums) {
            width = max(width, 32 - __builtin_clz(v));
        }
        int size = 1 << width;
        // dp[m] starts as the largest value whose set bits are exactly m
        // (0 when no element carries mask m).
        vector<int> dp(size, 0);
        for (int v : nums) {
            dp[v] = max(dp[v], v);
        }
        // Subset-max sweep: a mask holding bit b absorbs its b-cleared
        // twin; afterwards dp[m] is the largest value whose set bits are
        // a subset of m.
        for (int b = 0; b < width; ++b) {
            for (int m = 0; m < size; ++m) {
                if (m >> b & 1) {
                    dp[m] = max(dp[m], dp[m ^ (1 << b)]);
                }
            }
        }
        // A disjoint partner of v must carry a mask that is a subset of
        // FULL ^ mv, so dp holds the best partner directly. Products
        // reach 10^12, hence long long.
        int full = size - 1;
        long long best = 0;
        for (int v : nums) {
            best = max(best, (long long)v * dp[full ^ v]);
        }
        return best;
    }
};
