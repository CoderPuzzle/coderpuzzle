class Solution {
  public:
    int maxScore(vector<vector<int>> &grid) {
        int n = grid.size();
        // value -> bitmask of rows containing that value
        unordered_map<int, int> valueRows;
        for (int r = 0; r < n; r++) {
            for (int c : grid[r]) {
                valueRows[c] |= 1 << r;
            }
        }
        vector<int> values;
        values.reserve(valueRows.size());
        for (auto &kv : valueRows) {
            values.push_back(kv.first);
        }
        sort(values.rbegin(), values.rend());
        int full = 1 << n;
        vector<int> dp(full, -1), ndp(full, -1);
        dp[0] = 0;
        for (int value : values) {
            int rows = valueRows[value];
            copy(dp.begin(), dp.end(), ndp.begin());
            for (int mask = 0; mask < full; mask++) {
                int cur = dp[mask];
                if (cur < 0) {
                    continue;
                }
                int rem = rows & ~mask;
                while (rem) {
                    int bit = rem & -rem;
                    int nmask = mask | bit;
                    int cand = cur + value;
                    if (cand > ndp[nmask]) {
                        ndp[nmask] = cand;
                    }
                    rem &= rem - 1;
                }
            }
            dp.swap(ndp);
        }
        int ans = 0;
        for (int v : dp) {
            ans = max(ans, v);
        }
        return ans;
    }
};
