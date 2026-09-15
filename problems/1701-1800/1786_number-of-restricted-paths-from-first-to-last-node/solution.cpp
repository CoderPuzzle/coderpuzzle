class Solution {
  public:
    int countRestrictedPaths(int n, vector<vector<int>> &edges) {
        // Dijkstra from node n fixes dist[x] = distanceToLastNode(x). A
        // restricted path strictly decreases that distance at every step,
        // so visiting nodes in increasing distance order makes every count
        // final: each strictly-closer neighbor of u was visited before u.
        // Distances reach ~2*10^9 (n-1 edges of weight 10^5), so they are
        // held in 64-bit integers.
        const long long MOD = 1000000007;
        vector<vector<pair<int, int>>> adj(n + 1);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }
        vector<long long> dist(n + 1, LLONG_MAX);
        dist[n] = 0;
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> heap;
        heap.push({0, n});
        while (!heap.empty()) {
            auto [d, u] = heap.top();
            heap.pop();
            if (d > dist[u])
                continue;
            for (auto [v, w] : adj[u]) {
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    heap.push({d + w, v});
                }
            }
        }
        vector<int> order(n);
        iota(order.begin(), order.end(), 1);
        sort(order.begin(), order.end(), [&](int a, int b) { return dist[a] < dist[b]; });
        vector<long long> count(n + 1, 0);
        count[n] = 1;
        for (int u : order) {
            if (u == n)
                continue;
            long long total = 0;
            for (auto [v, w] : adj[u]) {
                if (dist[u] > dist[v])
                    total += count[v];
            }
            count[u] = total % MOD;
        }
        return (int)count[1];
    }
};
