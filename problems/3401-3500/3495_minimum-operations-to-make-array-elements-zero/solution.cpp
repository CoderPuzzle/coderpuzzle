class Solution {
  public:
    // cost(x) = k for x in [4^(k-1), 4^k): one "/4" step per band. An
    // operation performs two steps, so a query with S total steps over
    // [l, r] needs ceil(S / 2) operations; sum the steps per band.
    long long minOperations(vector<vector<int>> &queries) {
        auto stepsUpTo = [](long long v) {
            long long total = 0;
            long long low = 1;
            int k = 1;
            while (low <= v) {
                long long high = min(v, low * 4 - 1);
                total += (long long)k * (high - low + 1);
                low *= 4;
                k++;
            }
            return total;
        };
        long long ops = 0;
        for (auto &q : queries) {
            long long s = stepsUpTo(q[1]) - stepsUpTo(q[0] - 1);
            ops += (s + 1) / 2;
        }
        return ops;
    }
};
