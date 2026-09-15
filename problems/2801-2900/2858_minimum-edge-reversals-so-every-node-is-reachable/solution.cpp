class Solution {
  public:
    vector<int> minEdgeReversals(int n, vector<vector<int>> &edges) {
        vector<vector<pair<int, int>>> graph(n);
        for (auto &e : edges) {
            graph[e[0]].push_back({e[1], 0}); // traversing u -> v costs 0
            graph[e[1]].push_back({e[0], 1}); // traversing v -> u costs 1 (reversal)
        }
        vector<int> parent(n, -1), order;
        order.reserve(n);
        order.push_back(0);
        for (size_t i = 0; i < order.size(); i++) {
            int x = order[i];
            for (auto &[y, cost] : graph[x]) {
                if (y != parent[x]) {
                    parent[y] = x;
                    order.push_back(y);
                }
            }
        }

        vector<int> dp(n, 0);
        for (int i = n - 1; i >= 0; i--) {
            int x = order[i];
            for (auto &[y, cost] : graph[x]) {
                if (parent[y] == x)
                    dp[x] += dp[y] + cost;
            }
        }

        vector<int> ans(n, 0);
        ans[0] = dp[0];
        for (int i = 0; i < n; i++) {
            int x = order[i];
            for (auto &[y, cost] : graph[x]) {
                if (parent[y] == x)
                    ans[y] = ans[x] + (cost == 0 ? 1 : -1);
            }
        }
        return ans;
    }
};
