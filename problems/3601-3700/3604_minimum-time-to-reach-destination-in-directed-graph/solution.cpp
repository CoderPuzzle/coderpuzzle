class Solution {
  public:
    int minTime(int n, vector<vector<int>> &edges) {
        // Earliest-arrival Dijkstra: dist[u] is the soonest time you can be
        // standing on u. Waiting is always allowed, so an edge leaving u at
        // time t departs at max(t, start) — never later, because a later
        // departure only arrives later — provided that moment still lies
        // inside the edge's window. Times are held as long long.
        vector<vector<array<int, 3>>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2], e[3]});
        }
        vector<long long> dist(n, LLONG_MAX);
        dist[0] = 0;
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> heap;
        heap.push({0, 0});
        while (!heap.empty()) {
            auto [t, u] = heap.top();
            heap.pop();
            if (t > dist[u])
                continue;
            for (auto [v, start, end] : adj[u]) {
                long long depart = max(t, (long long)start);
                if (depart <= end) {
                    long long arrive = depart + 1;
                    if (arrive < dist[v]) {
                        dist[v] = arrive;
                        heap.push({arrive, v});
                    }
                }
            }
        }
        return dist[n - 1] == LLONG_MAX ? -1 : (int)dist[n - 1];
    }
};
