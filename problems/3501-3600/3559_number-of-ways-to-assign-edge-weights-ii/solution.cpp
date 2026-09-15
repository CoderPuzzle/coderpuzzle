class Solution {
  public:
    vector<int> assignEdgeWeights(vector<vector<int>> &edges, vector<vector<int>> &queries) {
        // As in part I, a path of d edges has odd cost for exactly 2^(d-1)
        // of its 2^d assignments (d = 0 answers 0), so each query only
        // needs the path length d = depth[u] + depth[v] - 2 * depth[lca].
        // Binary lifting answers every LCA in O(log n); the tree is rooted
        // with an explicit stack because it can be a 10^5-node chain.
        const long long mod = 1e9 + 7;
        int n = edges.size() + 1;
        vector<vector<int>> adj(n + 1);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        vector<int> depth(n + 1, 0), parent(n + 1, 0);
        vector<bool> seen(n + 1, false);
        seen[1] = true;
        vector<int> stack = {1};
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            for (int v : adj[u])
                if (!seen[v]) {
                    seen[v] = true;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    stack.push_back(v);
                }
        }
        int log = 1;
        while (1 << log < n)
            log++;
        vector<vector<int>> up(log, vector<int>(n + 1, 0));
        up[0] = parent;
        for (int k = 1; k < log; k++)
            for (int v = 0; v <= n; v++)
                up[k][v] = up[k - 1][up[k - 1][v]];
        vector<int> p2(n, 1);
        for (int i = 1; i < n; i++)
            p2[i] = (int)((long long)p2[i - 1] * 2 % mod);
        vector<int> answer(queries.size());
        for (int qi = 0; qi < (int)queries.size(); qi++) {
            int u = queries[qi][0], v = queries[qi][1];
            if (depth[u] < depth[v]) {
                swap(u, v);
            }
            int du = depth[u], dv = depth[v];
            int diff = du - dv, k = 0;
            while (diff > 0) {
                if (diff & 1)
                    u = up[k][u];
                diff >>= 1;
                k++;
            }
            if (u != v) {
                for (int kk = log - 1; kk >= 0; kk--)
                    if (up[kk][u] != up[kk][v]) {
                        u = up[kk][u];
                        v = up[kk][v];
                    }
                v = parent[u];
            }
            int d = du + dv - 2 * depth[v];
            answer[qi] = d == 0 ? 0 : p2[d - 1];
        }
        return answer;
    }
};
