class Solution {
  public:
    int maximumXorProduct(long long a, long long b, int n) {
        // Decide x's bits from the top down. Bits at or above n are
        // beyond x's reach and stay as they are. Below bit n: when a and
        // b agree on a bit, x can set it in both a^x and b^x — always a
        // win at that height. When they differ, exactly one of a^x and
        // b^x can carry the bit, and giving it to the currently smaller
        // value dominates: it adds bit*(other) to the product instead of
        // bit*(smaller). ax and bx stay below 2^50; the two mod factors
        // stay below 2^30, so their 64-bit product never overflows.
        const long long mod = 1000000007LL;
        long long ax = 0;
        long long bx = 0;
        for (int i = 49; i >= 0; --i) {
            long long bit = 1LL << i;
            if (i >= n) {
                if (a & bit) {
                    ax |= bit;
                }
                if (b & bit) {
                    bx |= bit;
                }
            } else if (((a >> i) & 1) == ((b >> i) & 1)) {
                ax |= bit;
                bx |= bit;
            } else if (ax <= bx) {
                ax |= bit;
            } else {
                bx |= bit;
            }
        }
        return static_cast<int>(ax % mod * (bx % mod) % mod);
    }
};
