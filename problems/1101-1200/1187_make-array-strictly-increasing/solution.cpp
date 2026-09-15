class Solution {
  public:
    int makeArrayIncreasing(vector<int> &arr1, vector<int> &arr2) {
        vector<int> b(arr2.begin(), arr2.end());
        sort(b.begin(), b.end());
        b.erase(unique(b.begin(), b.end()), b.end());
        int m = (int)b.size();

        // dp: strictly increasing prefix whose last value is v -> min ops.
        // keeping arr1[0] costs 0; any smaller replacement costs 1 (larger
        // replacements are dominated by keeping)
        unordered_map<long long, int> dp;
        dp[(long long)arr1[0]] = 0;
        for (int v : b) {
            if (v < arr1[0])
                dp[(long long)v] = 1;
        }

        for (int i = 1; i < (int)arr1.size(); i++) {
            unordered_map<long long, int> ndp;
            for (auto &kv : dp) {
                long long last = kv.first;
                int ops = kv.second;
                // keep arr1[i] when it strictly exceeds last: no cost
                if ((long long)arr1[i] > last) {
                    auto it = ndp.find((long long)arr1[i]);
                    if (it == ndp.end() || it->second > ops)
                        ndp[(long long)arr1[i]] = ops;
                }
                // replace with the smallest arr2 value > last: the smallest
                // choice leaves the most room for what follows; costs 1 op
                int idx = (int)(upper_bound(b.begin(), b.end(), (int)min<long long>(last, 2147483647LL)) - b.begin());
                if (idx < m) {
                    long long v = b[idx];
                    int cost = ops + 1;
                    auto it = ndp.find(v);
                    if (it == ndp.end() || it->second > cost)
                        ndp[v] = cost;
                }
            }
            dp = ndp;
            // no state survives: a strictly increasing arrangement is impossible
            if (dp.empty())
                return -1;
        }

        int best = INT_MAX;
        for (auto &kv : dp)
            best = min(best, kv.second);
        return best;
    }
};
