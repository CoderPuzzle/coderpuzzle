class Solution {
  public:
    vector<long long> minimumWeight(vector<vector<int>> &edges, vector<vector<int>> &queries) {
        int n = edges.size() + 1;
        vector<vector<pair<int, int>>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }

        // Root at 0 and walk an Euler tour iteratively, so deep chains cannot
        // overflow the call stack. Every node enters the tour at its first
        // visit and re-enters each time a child's subtree closes, giving
        // 2n - 1 entries; first[v] is v's earliest slot in that sequence.
        vector<int> depth(n, 0), parent(n, -1), first(n, 0), it(n, 0);
        vector<long long> dist(n, 0);
        vector<int> tour, stack;
        tour.reserve(2 * n - 1);
        tour.push_back(0);
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            if (it[u] < (int)adj[u].size()) {
                auto [v, w] = adj[u][it[u]++];
                if (v != parent[u]) {
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    dist[v] = dist[u] + w;
                    first[v] = tour.size();
                    tour.push_back(v);
                    stack.push_back(v);
                }
            } else {
                stack.pop_back();
                if (!stack.empty())
                    tour.push_back(stack.back());
            }
        }
        int m = tour.size();

        // Sparse table: table[k][i] is the shallowest node over the 2^k tour
        // entries from i - the range argmin under depth comparison.
        int log = 32 - __builtin_clz(m);
        vector<vector<int>> table(log);
        table[0] = tour;
        for (int k = 1; k < log; k++) {
            const vector<int> &prev = table[k - 1];
            int half = 1 << (k - 1);
            int len = m - (1 << k) + 1;
            vector<int> cur(len);
            for (int i = 0; i < len; i++)
                cur[i] = depth[prev[i]] <= depth[prev[i + half]] ? prev[i] : prev[i + half];
            table[k] = cur;
        }

        auto lca = [&](int x, int y) {
            int l = first[x], r = first[y];
            if (l > r)
                swap(l, r);
            int k = 31 - __builtin_clz(r - l + 1);
            int a = table[k][l], b = table[k][r - (1 << k) + 1];
            return depth[a] <= depth[b] ? a : b;
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
