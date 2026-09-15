class Solution {
  public:
    long long popcountDepth(long long n, int k) {
        // depth[j] = popcount-depth of the value j itself: 1 has depth 0,
        // deeper values sit one step past their own popcount.
        int depth[64] = {};
        for (int j = 2; j < 64; ++j)
            depth[j] = depth[__builtin_popcountll(j)] + 1;
        // Digit DP over the binary digits of n: free[x] counts prefixes
        // already strictly below n's prefix that carry x set bits, while
        // tightOnes follows n's exact prefix. Answers reach ~5e14, past
        // the 32-bit range.
        long long free_[64] = {};
        int tightOnes = 0;
        for (int i = 63 - __builtin_clzll(n); i >= 0; --i) {
            long long nxt[64];
            for (int x = 0; x < 64; ++x)
                nxt[x] = free_[x];
            for (int x = 0; x < 64; ++x)
                if (free_[x])
                    nxt[x + 1] += free_[x];
            if ((n >> i) & 1) {
                // Place 0 under n's 1: that branch goes loose, free to
                // take any suffix of the remaining bits.
                nxt[tightOnes] += 1;
                ++tightOnes;
            }
            for (int x = 0; x < 64; ++x)
                free_[x] = nxt[x];
        }
        // counts[x] = integers in [1, n] with x set bits (0 included).
        long long counts[64];
        for (int x = 0; x < 64; ++x)
            counts[x] = free_[x];
        counts[tightOnes] += 1;
        counts[0] -= 1; // the all-zero string is not a positive integer
        counts[1] -= 1; // x = 1 itself has depth 0, not depth 1
        long long answer = k == 0 ? 1 : 0;
        for (int j = 1; j < 64; ++j)
            if (depth[j] == k - 1)
                answer += counts[j];
        return answer;
    }
};
