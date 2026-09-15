#include <vector>

class Solution {
  public:
    // Straight simulation: at most ~93k seconds for 2^31 inputs because the
    // consumed total grows quadratically. Inputs and remainders fit in the
    // signed 64-bit contract even though the judge's range tops near 2^31.
    std::vector<long long> memLeak(long long memory1, long long memory2) {
        long long t = 1;
        while (true) {
            if (memory1 >= memory2) {
                if (memory1 < t) {
                    break;
                }
                memory1 -= t;
            } else {
                if (memory2 < t) {
                    break;
                }
                memory2 -= t;
            }
            t++;
        }
        return {t, memory1, memory2};
    }
};
