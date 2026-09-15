class Solution {
  public:
    vector<int> sumOfDistancesInTree(int n, vector<vector<int>> &edges) {
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Iterative DFS from node 0: parents and a top-down visit order.
        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        vector<char> seen(n, 0);
        seen[0] = 1;
        order.push_back(0);
        for (size_t head = 0; head < order.size(); head++) {
            int u = order[head];
            for (int v : adj[u]) {
                if (!seen[v]) {
                    seen[v] = 1;
                    parent[v] = u;
                    order.push_back(v);
                }
            }
        }

        vector<long long> sub(n, 1), dist(n, 0);
        // Bottom-up pass: dist[u] = sum over children of (dist[v] + sub[v]).
        for (int i = (int)order.size() - 1; i >= 0; i--) {
            int u = order[i];
            for (int v : adj[u]) {
                if (v == parent[u])
                    continue;
                sub[u] += sub[v];
                dist[u] += dist[v] + sub[v];
            }
        }

        vector<int> ans(n, 0);
        ans[0] = (int)dist[0];
        // Top-down re-rooting pass.
        for (int u : order) {
            for (int v : adj[u]) {
                if (v == parent[u])
                    continue;
                ans[v] = (int)(ans[u] - sub[v] + (n - sub[v]));
            }
        }
        return ans;
    }
};
