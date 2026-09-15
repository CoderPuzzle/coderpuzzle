class Solution {
  public:
    vector<int> findMedian(int n, vector<vector<int>> &edges, vector<vector<int>> &queries) {
        // Root the tree at 0 with an explicit stack (a 10^5-node chain
        // would blow the stack), recording parent, depth and weighted
        // root distance. Binary lifting then answers each query in
        // O(log n): lift to the LCA l, take the total path weight tot
        // and the cumulative sum acc from u to l. "Sum >= tot/2" is
        // tested as 2 * sum >= tot so no halves appear; all distances
        // fit in long long (n * max_w <= 10^14).
        vector<vector<pair<int, int>>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }
        vector<int> parent(n, 0), depth(n, 0);
        vector<long long> dist(n, 0);
        vector<bool> seen(n, false);
        seen[0] = true;
        vector<int> stack = {0};
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            for (auto [v, w] : adj[u])
                if (!seen[v]) {
                    seen[v] = true;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    dist[v] = dist[u] + w;
                    stack.push_back(v);
                }
        }
        int log = 1;
        while (1 << log < n)
            log++;
        vector<vector<int>> up(log, vector<int>(n, 0));
        up[0] = parent;
        for (int k = 1; k < log; k++)
            for (int v = 0; v < n; v++)
                up[k][v] = up[k - 1][up[k - 1][v]];
        vector<int> answer(queries.size());
        for (int qi = 0; qi < (int)queries.size(); qi++) {
            int a = queries[qi][0], b = queries[qi][1];
            if (a == b) {
                // Single-node path: the sum from a to itself (0)
                // already meets half of the zero total, so a is the
                // median.
                answer[qi] = a;
                continue;
            }
            int u = a, v = b;
            if (depth[u] < depth[v])
                swap(u, v);
            int diff = depth[u] - depth[v], k = 0;
            while (diff > 0) {
                if (diff & 1)
                    u = up[k][u];
                diff >>= 1;
                k++;
            }
            int l = v;
            if (u != v) {
                for (int kk = log - 1; kk >= 0; kk--)
                    if (up[kk][u] != up[kk][v]) {
                        u = up[kk][u];
                        v = up[kk][v];
                    }
                l = parent[u];
            }
            long long tot = dist[a] + dist[b] - 2 * dist[l];
            long long acc = dist[a] - dist[l];
            if (2 * acc >= tot) {
                // Median on the a -> l stretch. Climb from a while the
                // criterion still fails; the parent of the deepest
                // failing node is the first one that satisfies it.
                int x = a;
                for (int kk = log - 1; kk >= 0; kk--) {
                    int t = up[kk][x];
                    if (depth[t] >= depth[l] && 2 * (dist[a] - dist[t]) < tot)
                        x = t;
                }
                answer[qi] = parent[x];
            } else {
                // Median on the l -> b stretch. Climb from b while the
                // criterion still holds; the highest such node (never
                // l itself, which failed) is the median.
                int x = b;
                for (int kk = log - 1; kk >= 0; kk--) {
                    int t = up[kk][x];
                    if (depth[t] > depth[l] && 2 * (acc + dist[t] - dist[l]) >= tot)
                        x = t;
                }
                answer[qi] = x;
            }
        }
        return answer;
    }
};
