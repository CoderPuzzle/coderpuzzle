class Solution {
  public:
    vector<int> countServers(int n, vector<vector<int>> &logs, int x, vector<int> &queries) {
        // In the time-sorted logs each query's hits form a contiguous run
        // (times in [q - x, q]). Answering queries in increasing order lets
        // one window serve them all; sorting indices keeps answers in place.
        sort(logs.begin(), logs.end(), [](const vector<int> &a, const vector<int> &b) { return a[1] < b[1]; });
        int q = queries.size();
        vector<int> order(q);
        for (int i = 0; i < q; ++i)
            order[i] = i;
        sort(order.begin(), order.end(), [&](int a, int b) { return queries[a] < queries[b]; });
        vector<int> cnt(n + 1, 0);
        vector<int> arr(q);
        int distinct = 0;
        int lo = 0, hi = 0;
        for (int idx : order) {
            int top = queries[idx];
            int bottom = top - x;
            // <= admits a log at exactly q; strict < keeps q - x inside,
            // so both interval edges stay inclusive.
            while (hi < (int)logs.size() && logs[hi][1] <= top) {
                if (++cnt[logs[hi][0]] == 1)
                    ++distinct;
                ++hi;
            }
            while (lo < hi && logs[lo][1] < bottom) {
                if (--cnt[logs[lo][0]] == 0)
                    --distinct;
                ++lo;
            }
            arr[idx] = n - distinct;
        }
        return arr;
    }
};
