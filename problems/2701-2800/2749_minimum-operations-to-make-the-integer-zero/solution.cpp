class Solution {
  public:
    int makeTheIntegerZero(int num1, int num2) {
        // After k operations num1 became num1 - k*num2 - (sum of k powers of
        // two), so reaching 0 means m = num1 - k*num2 is a sum of exactly k
        // powers of two. That holds iff popcount(m) <= k <= m.
        for (long long k = 1; k <= 60; ++k) {
            // m peaks near 6.1e10, past int range: compute in long long.
            long long m = num1 - k * (long long)num2;
            if (m >= k && __builtin_popcountll(m) <= k) {
                // Scanning upward makes the first hit the minimum.
                return static_cast<int>(k);
            }
        }
        return -1;
    }
};
