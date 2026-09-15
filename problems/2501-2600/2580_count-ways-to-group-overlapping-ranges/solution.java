import java.util.Arrays;

class Solution {

    public int countWays(int[][] ranges) {
        // Sort by start point; overlapping ranges then form contiguous
        // runs, and each maximal run sits in either group freely, so
        // the answer is 2^(runs) mod 1e9+7 by iterative binary
        // exponentiation; longs absorb the ~10^18 intermediate products
        // safely.
        final long mod = 1_000_000_007L;
        Arrays.sort(ranges, (a, b) -> Integer.compare(a[0], b[0]));
        int groups = 1;
        int reach = ranges[0][1];
        for (int i = 1; i < ranges.length; ++i) {
            int s = ranges[i][0];
            int e = ranges[i][1];
            if (s > reach) {
                ++groups;
                reach = e;
            } else if (e > reach) {
                reach = e;
            }
        }
        long result = 1;
        long base = 2 % mod;
        for (long e = groups; e > 0; e >>= 1) {
            if ((e & 1) == 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
        }
        return (int) result;
    }
}
