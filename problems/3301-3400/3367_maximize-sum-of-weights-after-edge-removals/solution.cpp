class Solution {
  public:
    long long maximizeSumOfWeights(vector<vector<int>> &edges, int k) {
        int n = 0;
        for (auto &e : edges) {
            n = max(n, max(e[0], e[1]));
        }
        n++;
        vector<vector<pair<int, long long>>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }

        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        parent[0] = 0;
        vector<int> stack;
        stack.reserve(n);
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (auto &[v, w] : adj[u]) {
                if (v == parent[u])
                    continue;
                parent[v] = u;
                stack.push_back(v);
            }
        }

        // g[u]: best subtree sum when the edge to u's parent is NOT kept.
        // f[u]: best subtree sum when the edge to u's parent IS kept.
        vector<long long> g(n, 0), f(n, 0);
        vector<long long> gains;
        for (int oi = (int)order.size() - 1; oi >= 0; oi--) {
            int u = order[oi];
            long long total = 0;
            gains.clear();
            for (auto &[v, w] : adj[u]) {
                if (parent[v] == u) {
                    total += g[v];
                    gains.push_back((long long)w + f[v] - g[v]);
                }
            }
            sort(gains.begin(), gains.end(), greater<long long>());
            int take = min((long long)k, (long long)gains.size());
            int take1 = min((long long)k - 1, (long long)gains.size());
            long long s0 = total, s1 = total;
            for (int i = 0; i < take; i++) {
                if (gains[i] > 0)
                    s0 += gains[i];
            }
            for (int i = 0; i < take1; i++) {
                if (gains[i] > 0)
                    s1 += gains[i];
            }
            g[u] = s0;
            f[u] = s1;
        }
        return g[0];
    }
};
