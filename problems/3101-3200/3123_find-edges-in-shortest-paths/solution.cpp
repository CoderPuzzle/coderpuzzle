class Solution {
  public:
    vector<bool> findAnswer(int n, vector<vector<int>> &edges) {
        vector<vector<pair<int, int>>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }

        const long long INF = LLONG_MAX;
        auto dijkstra = [&](int src) {
            vector<long long> dist(n, INF);
            dist[src] = 0;
            priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
            pq.push({0, src});
            while (!pq.empty()) {
                auto [d, u] = pq.top();
                pq.pop();
                // stale entry: dist[u] was improved after this was pushed
                if (d != dist[u])
                    continue;
                for (auto [v, w] : adj[u]) {
                    long long nd = d + w;
                    if (nd < dist[v]) {
                        dist[v] = nd;
                        pq.push({nd, v});
                    }
                }
            }
            return dist;
        };

        vector<long long> dist0 = dijkstra(0);
        vector<long long> distN = dijkstra(n - 1);
        // reference length every shortest 0 -> n-1 path must match
        long long total = dist0[n - 1];

        vector<bool> ans(edges.size(), false);
        // unreachable: no edge lies on a shortest path
        if (total == INF) {
            return ans;
        }
        for (int i = 0; i < (int)edges.size(); i++) {
            int u = edges[i][0], v = edges[i][1], w = edges[i][2];
            // on a shortest path iff d0(one end) + w + dN(other end) == total,
            // tested both ways since the undirected edge may be crossed either way
            if (dist0[u] + w + distN[v] == total || dist0[v] + w + distN[u] == total) {
                ans[i] = true;
            }
        }
        return ans;
    }
};
