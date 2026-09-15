class Solution {
  public:
    int findTheCity(int n, vector<vector<int>> &edges, int distanceThreshold) {
        // Mirror each undirected edge both ways, so every node can run its own
        // Dijkstra over the adjacency list and pay only for real edges.
        vector<vector<pair<int, int>>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }
        const int INF = INT_MAX / 2;
        vector<int> counts(n, 0);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
        for (int src = 0; src < n; src++) {
            // Dijkstra from src: with positive weights the smallest tentative pop
            // is already final, so every node settles exactly once.
            vector<int> dist(n, INF);
            dist[src] = 0;
            heap.push({0, src});
            while (!heap.empty()) {
                auto [d, u] = heap.top();
                heap.pop();
                // Stale-entry guard: skip outdated heap records.
                if (d > dist[u]) {
                    continue;
                }
                for (auto &[v, w] : adj[u]) {
                    // Relax only when the route strictly improves.
                    if (d + w < dist[v]) {
                        dist[v] = d + w;
                        heap.push({d + w, v});
                    }
                }
            }
            int count = 0;
            for (int v = 0; v < n; v++) {
                if (v != src && dist[v] <= distanceThreshold) {
                    count++;
                }
            }
            counts[src] = count;
        }
        // Ascending scan with a strictly-smaller count (or equal count at a
        // larger index) implements the tie-break: greatest city number wins.
        int bestCity = -1;
        int bestCount = INF;
        for (int i = 0; i < n; i++) {
            int count = counts[i];
            if (count < bestCount || (count == bestCount && i > bestCity)) {
                bestCity = i;
                bestCount = count;
            }
        }
        return bestCity;
    }
};
