class Solution {
  public:
    long long getMaxFunctionValue(vector<int> &receiver, long long k) {
        int n = receiver.size();
        int log = 64 - __builtin_clzll((unsigned long long)k); // bit length of k (k >= 1)
        vector<vector<int>> up(log, vector<int>(n));
        vector<vector<long long>> sm(log, vector<long long>(n));
        for (int x = 0; x < n; x++) {
            up[0][x] = receiver[x];
            sm[0][x] = receiver[x];
        }
        // Binary lifting: up[j][x] is the holder after 2^j passes from x,
        // sm[j][x] the sum of receivers during them. Each level composes two
        // half-jumps; the sum adds sm at x plus sm at the midpoint because
        // the second jump's receivers start where the first lands.
        for (int j = 1; j < log; j++) {
            for (int x = 0; x < n; x++) {
                int mid = up[j - 1][x];
                up[j][x] = up[j - 1][mid];
                sm[j][x] = sm[j - 1][x] + sm[j - 1][mid];
            }
        }
        long long best = 0;
        for (int x = 0; x < n; x++) {
            // x itself counts in the score but appears in no receiving sum.
            // Decompose k into set bits: each set bit b contributes sm[b][cur]
            // and teleports cur, simulating k <= 1e10 passes in log k steps.
            long long total = x;
            int cur = x;
            long long remaining = k;
            int bit = 0;
            while (remaining) {
                if (remaining & 1) {
                    total += sm[bit][cur];
                    cur = up[bit][cur];
                }
                remaining >>= 1;
                bit += 1;
            }
            if (total > best) {
                best = total;
            }
        }
        return best;
    }
};
