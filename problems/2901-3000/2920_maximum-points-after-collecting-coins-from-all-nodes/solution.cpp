class Solution {
  public:
    // dp[v][t] = best points from v's subtree when t ancestral halvings
    // already apply to coins[v]. Halving composes with the shift and
    // coins <= 10^4 < 2^14 die after 14 halvings, so the table is 15
    // wide. The total reaches n * max(coins) = 10^9, kept in long long
    // for headroom. Traversal is iterative: a path tree is 10^5 deep.
    long long maximumPoints(vector<vector<int>> &edges, vector<int> &coins, int k) {
        int n = (int)coins.size();
        vector<vector<int>> adj(n);
        for (const auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Root at 0 once: BFS fixes parents and a top-down visit order,
        // so every later pass walks flat arrays and nothing recurses.
        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        order.push_back(0);
        for (std::size_t head = 0; head < order.size(); ++head) {
            int u = order[head];
            for (int v : adj[u]) {
                if (parent[v] == -1 && v != 0) {
                    parent[v] = u;
                    order.push_back(v);
                }
            }
        }

        // Bottom-up over reverse BFS order; s[v][t] accumulates the
        // children's dp column so each node finalizes in O(15). Column
        // 15 stays 0 forever (the absorbed state).
        vector<std::array<long long, 16>> s(n), dp(n);
        for (int i = n - 1; i >= 0; --i) {
            int v = order[i];
            int c = coins[v];
            for (int t = 0; t < 15; ++t) {
                // First way: take the k hit (it may be negative). Second
                // way: halve, and the children inherit t + 1.
                long long way1 = (c >> t) - k + s[v][t];
                long long way2 = (c >> (t + 1)) + s[v][t + 1];
                dp[v][t] = std::max(way1, way2);
            }
            int p = parent[v];
            if (p >= 0) {
                for (int t = 0; t < 15; ++t) {
                    s[p][t] += dp[v][t];
                }
            }
        }
        return dp[0][0];
    }
};
