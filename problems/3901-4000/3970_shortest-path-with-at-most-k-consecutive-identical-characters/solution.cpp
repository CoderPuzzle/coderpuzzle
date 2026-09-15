class Solution {
  public:
    long long shortestPath(int n, vector<vector<int>> &edges, string labels, int k) {
        vector<vector<pair<int, int>>> g(n);
        for (auto &e : edges)
            g[e[0]].push_back({e[1], e[2]});
        const long long INF = 4e18;
        vector<vector<long long>> d(n, vector<long long>(k + 1, INF));
        using T = tuple<long long, int, int>;
        priority_queue<T, vector<T>, greater<T>> q;
        d[0][1] = 0;
        q.push({0, 0, 1});
        while (!q.empty()) {
            auto [x, u, c] = q.top();
            q.pop();
            if (x != d[u][c])
                continue;
            for (auto [v, w] : g[u]) {
                int nc = labels[u] == labels[v] ? c + 1 : 1;
                if (nc <= k && x + w < d[v][nc]) {
                    d[v][nc] = x + w;
                    q.push({x + w, v, nc});
                }
            }
        }
        long long z = *min_element(d[n - 1].begin(), d[n - 1].end());
        return z == INF ? -1 : z;
    }
};
