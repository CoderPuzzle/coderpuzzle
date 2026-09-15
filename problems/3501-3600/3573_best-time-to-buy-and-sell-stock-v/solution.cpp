class Solution {
  public:
    long long maximumProfit(vector<int> &prices, int k) {
        // Per day, for each count t of completed transactions: done[t] =
        // flat, openLong[t] = holding a bought share, openShort[t] =
        // holding a shorted share. NEG marks impossible states.
        const long long NEG = -1000000000000000LL;
        vector<long long> done(k + 1, NEG), openLong(k + 1, NEG), openShort(k + 1, NEG);
        done[0] = 0;
        for (int price : prices) {
            // Closes today complete transaction t+1 from an open position.
            vector<long long> nd = done;
            for (int t = 0; t < k; ++t)
                nd[t + 1] = max(done[t + 1], max(openLong[t] + price, openShort[t] - price));
            // Opens read done[t] from BEFORE today's closes: a close and
            // the next open can never share a day (and an open can never
            // close the same day, since closes read the old open row).
            vector<long long> nl = openLong, ns = openShort;
            for (int t = 0; t <= k; ++t) {
                nl[t] = max(nl[t], done[t] - price);
                ns[t] = max(ns[t], done[t] + price);
            }
            done = nd;
            openLong = nl;
            openShort = ns;
        }
        return *max_element(done.begin(), done.end());
    }
};
