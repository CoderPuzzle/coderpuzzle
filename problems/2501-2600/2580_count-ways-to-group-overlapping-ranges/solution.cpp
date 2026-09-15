#include <algorithm>
#include <vector>

class Solution {
  public:
    int countWays(std::vector<std::vector<int>> &ranges) {
        // Sort by start point; overlapping ranges then form contiguous
        // runs, and each maximal run sits in either group freely, so
        // the answer is 2^(runs) mod 1e9+7 by iterative binary
        // exponentiation; long longs absorb the ~10^18 intermediate
        // products safely.
        const long long MOD = 1000000007LL;
        std::sort(ranges.begin(), ranges.end());
        int groups = 1;
        int reach = ranges[0][1];
        for (int i = 1; i < static_cast<int>(ranges.size()); ++i) {
            int s = ranges[i][0];
            int e = ranges[i][1];
            if (s > reach) {
                ++groups;
                reach = e;
            } else if (e > reach) {
                reach = e;
            }
        }
        long long result = 1;
        long long base = 2 % MOD;
        for (long long e = groups; e > 0; e >>= 1) {
            if (e & 1)
                result = result * base % MOD;
            base = base * base % MOD;
        }
        return static_cast<int>(result);
    }
};
