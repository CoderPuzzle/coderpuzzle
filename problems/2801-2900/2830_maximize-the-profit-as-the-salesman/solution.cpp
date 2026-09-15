class Solution {
  public:
    int maximizeTheProfit(int n, vector<vector<int>> &offers) {
        // Non-overlapping offers make this weighted interval scheduling on a
        // line. Bucket offers by end house — the bucket array itself
        // provides ordering by end position, so no sorting is needed.
        vector<vector<pair<int, int>>> byEnd(n);
        for (const auto &offer : offers) {
            byEnd[offer[1]].push_back({offer[0], offer[2]});
        }
        // dp[e + 1]: best gold from houses 0..e. Either house e stays unsold
        // (carry dp[e] forward) or some offer [start, e, gold] is sold on
        // top of the optimum strictly before its start — reading dp[start]
        // is what keeps overlapping offers from being combined.
        vector<long long> dp(n + 1, 0);
        for (int end = 0; end < n; end++) {
            dp[end + 1] = dp[end];
            for (const auto &[start, gold] : byEnd[end]) {
                long long cand = dp[start] + gold;
                if (cand > dp[end + 1]) {
                    dp[end + 1] = cand;
                }
            }
        }
        return (int)dp[n];
    }
};
