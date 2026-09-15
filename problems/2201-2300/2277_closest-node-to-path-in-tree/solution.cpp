class Solution {
  public:
    vector<int> closestNode(int n, vector<vector<int>> &edges, vector<vector<int>> &query) {
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Breadth-first walk from the root records parents and depths
        // without recursion, so chain-shaped trees cannot overflow the
        // call stack.
        vector<int> parent(n, -1), depth(n, 0), order;
        vector<bool> visited(n, false);
        order.reserve(n);
        visited[0] = true;
        order.push_back(0);
        for (int head = 0; head < (int)order.size(); ++head) {
            int u = order[head];
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    order.push_back(v);
                }
            }
        }

        // up[k][v] is the 2^k-th ancestor of v, or -1 once past the root.
        int LOG = 1;
        while ((1 << LOG) < n)
            ++LOG;
        vector<vector<int>> up(LOG, vector<int>(n, -1));
        up[0] = parent;
        for (int k = 1; k < LOG; ++k) {
            for (int v = 0; v < n; ++v) {
                int mid = up[k - 1][v];
                if (mid != -1)
                    up[k][v] = up[k - 1][mid];
            }
        }

        auto lca = [&](int u, int v) -> int {
            if (depth[u] < depth[v])
                swap(u, v);
            int diff = depth[u] - depth[v], k = 0;
            while (diff) {
                if (diff & 1)
                    u = up[k][u];
                diff >>= 1;
                ++k;
            }
            if (u == v)
                return u;
            for (int k = LOG - 1; k >= 0; --k) {
                if (up[k][u] != up[k][v]) {
                    u = up[k][u];
                    v = up[k][v];
                }
            }
            return parent[u];
        };

        // The deepest of the three pairwise LCAs is where node's route
        // merges onto the start-end path -- always on the path, and the
        // unique minimizer of the distance to it.
        vector<int> answer;
        answer.reserve(query.size());
        for (auto &q : query) {
            int s = q[0], e = q[1], x = q[2];
            int best = lca(s, e);
            for (int cand : {lca(s, x), lca(e, x)}) {
                if (depth[cand] > depth[best])
                    best = cand;
            }
            answer.push_back(best);
        }
        return answer;
    }
};
