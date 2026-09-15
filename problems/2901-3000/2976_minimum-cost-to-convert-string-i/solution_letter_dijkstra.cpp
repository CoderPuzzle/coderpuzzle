class Solution {
  public:
    long long minimumCost(string source, string target, vector<string> &original, vector<string> &changed,
                          vector<int> &cost) {
        // A conversion rule is a directed edge in the 26-letter cost graph;
        // the cheapest a->b conversion is the shortest path a->b.
        vector<vector<pair<int, int>>> adj(26);
        for (int e = 0; e < (int)original.size(); e++) {
            int a = original[e][0] - 'a';
            int b = changed[e][0] - 'a';
            // Duplicate rules for the same pair need no care: the relaxation test keeps the cheaper copy.
            adj[a].push_back({b, cost[e]});
        }
        const long long INF = LLONG_MAX / 4;
        vector<vector<long long>> dist(26, vector<long long>(26, INF));
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> heap;
        for (int src = 0; src < 26; src++) {
            // Dijkstra from src: with positive costs the smallest tentative pop
            // is already final, so every letter settles exactly once.
            vector<long long> &row = dist[src];
            row[src] = 0;
            heap.push({0, src});
            while (!heap.empty()) {
                auto [d, u] = heap.top();
                heap.pop();
                // Stale-entry guard: skip outdated heap records.
                if (d > row[u]) {
                    continue;
                }
                for (auto &[v, w] : adj[u]) {
                    long long nd = d + w;
                    // Relax only when the route strictly improves.
                    if (nd < row[v]) {
                        row[v] = nd;
                        heap.push({nd, v});
                    }
                }
            }
        }
        // Matching characters convert for free; one unreachable pair fails all.
        long long total = 0;
        int len = (int)source.size();
        for (int p = 0; p < len; p++) {
            int s = source[p] - 'a';
            int t = target[p] - 'a';
            if (s == t)
                continue;
            long long d = dist[s][t];
            if (d == INF)
                return -1;
            total += d;
        }
        return total;
    }
};
