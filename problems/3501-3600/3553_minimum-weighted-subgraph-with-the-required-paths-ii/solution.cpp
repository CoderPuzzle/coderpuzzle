class Solution {
  public:
    vector<long long> minimumWeight(vector<vector<int>> &edges, vector<vector<int>> &queries) {
        int n = edges.size() + 1;
        vector<vector<pair<int, int>>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }

        // Root at 0; iterative traversal so deep chains cannot overflow the stack.
        vector<int> depth(n, 0), parent(n, 0);
        vector<long long> dist(n, 0);
        vector<char> seen(n, 0);
        seen[0] = 1;
        vector<int> stack;
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            for (auto &[v, w] : adj[u]) {
                if (!seen[v]) {
                    seen[v] = 1;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    dist[v] = dist[u] + w;
                    stack.push_back(v);
                }
            }
        }

        // Binary lifting: up[k][v] is the 2^k-th ancestor of v (root's is root).
        int log = 1;
        while ((1 << log) <= n - 1)
            log++;
        vector<vector<int>> up(log, vector<int>(n));
        up[0] = parent;
        for (int k = 1; k < log; k++) {
            for (int v = 0; v < n; v++) {
                up[k][v] = up[k - 1][up[k - 1][v]];
            }
        }

        auto lca = [&](int x, int y) {
            if (depth[x] < depth[y])
                swap(x, y);
            int diff = depth[x] - depth[y];
            for (int k = 0; diff > 0; k++, diff >>= 1) {
                if (diff & 1)
                    x = up[k][x];
            }
            if (x == y)
                return x;
            for (int k = log - 1; k >= 0; k--) {
                if (up[k][x] != up[k][y]) {
                    x = up[k][x];
                    y = up[k][y];
                }
            }
            return up[0][x];
        };
        auto distance = [&](int x, int y) { return dist[x] + dist[y] - 2 * dist[lca(x, y)]; };

        // The minimal subtree joining a, b, c is the union of the three paths,
        // each edge lying on exactly two of them.
        vector<long long> answer;
        answer.reserve(queries.size());
        for (auto &q : queries) {
            answer.push_back((distance(q[0], q[1]) + distance(q[1], q[2]) + distance(q[2], q[0])) / 2);
        }
        return answer;
    }
};
