class Solution {
  public:
    int minCost(string s, string t, vector<vector<string>> &rules, vector<int> &costs) {
        int n = s.size(), INF = 1e9;
        vector<int> dp(n + 1, INF);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == INF)
                continue;
            if (s[i] == t[i])
                dp[i + 1] = min(dp[i + 1], dp[i]);
            for (int q = 0; q < rules.size(); q++) {
                auto &p = rules[q][0];
                auto &r = rules[q][1];
                int z = p.size();
                if (i + z > n || t.compare(i, z, r))
                    continue;
                bool ok = 1;
                int stars = 0;
                for (int j = 0; j < z; j++) {
                    stars += p[j] == '*';
                    if (p[j] != '*' && p[j] != s[i + j])
                        ok = 0;
                }
                if (ok)
                    dp[i + z] = min(dp[i + z], dp[i] + costs[q] + stars);
            }
        }
        return dp[n] == INF ? -1 : dp[n];
    }
};
