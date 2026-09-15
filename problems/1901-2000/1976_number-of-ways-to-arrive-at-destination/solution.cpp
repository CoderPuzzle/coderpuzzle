class Solution {
  public:
    int countPaths(int n, vector<vector<int>> &roads) {
        const long long MOD = 1000000007LL;
        vector<vector<pair<int, int>>> adj(n);
        for (auto &r : roads) {
            adj[r[0]].push_back({r[1], r[2]});
            adj[r[1]].push_back({r[0], r[2]});
        }
        vector<long long> dist(n, LLONG_MAX);
        vector<long long> ways(n, 0);
        dist[0] = 0;
        ways[0] = 1; // exactly one way to be at the source: the empty path
        // min-heap of (dist, node)
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> heap;
        heap.push({0, 0});
        while (!heap.empty()) {
            auto [d, u] = heap.top();
            heap.pop();
            // Positive weights => u is finalized only after every shortest path
            // into it was relaxed, so ways[u] is complete at pop time;
            // d > dist[u] just discards a stale heap entry.
            if (d > dist[u])
                continue;
            for (auto &e : adj[u]) {
                int v = e.first;
                long long nd = d + e.second;
                if (nd < dist[v]) {
                    // Strictly shorter route: old path counts are obsolete, reset.
                    dist[v] = nd;
                    ways[v] = ways[u];
                    heap.push({nd, v});
                } else if (nd == dist[v]) {
                    // Equally short route: extend the count, not the distance.
                    ways[v] = (ways[v] + ways[u]) % MOD;
                }
            }
        }
        return (int)(ways[n - 1] % MOD);
    }
};
