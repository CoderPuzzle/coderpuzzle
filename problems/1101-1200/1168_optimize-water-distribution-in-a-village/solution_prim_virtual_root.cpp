class Solution {
  public:
    int minCostToSupplyWater(int n, vector<int> &wells, vector<vector<int>> &pipes) {
        // Prim over sites 1..n plus a virtual node 0 (source edges): grow the
        // tree outward from node 0, always settling the cheapest frontier
        // edge; an edge must beat the site's recorded best to be pushed.
        vector<vector<pair<int, int>>> adj(n + 1);
        for (int i = 0; i < n; i++) {
            adj[0].push_back({wells[i], i + 1});
            adj[i + 1].push_back({wells[i], 0});
        }
        for (auto &pipe : pipes) {
            adj[pipe[0]].push_back({pipe[2], pipe[1]});
            adj[pipe[1]].push_back({pipe[2], pipe[0]});
        }

        vector<int> best(n + 1, INT_MAX);
        best[0] = 0;
        vector<bool> visited(n + 1, false);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
        heap.emplace(0, 0);
        int total = 0;
        int taken = 0;
        while (!heap.empty()) {
            auto [cost, site] = heap.top();
            heap.pop();
            // Stale-entry guard: the site already joined the tree earlier.
            if (visited[site]) {
                continue;
            }
            visited[site] = true;
            total += cost;
            taken += 1;
            if (taken == n + 1) {
                break;
            }
            for (auto &[w, v] : adj[site]) {
                // Relax only when the link strictly improves the site's best.
                if (!visited[v] && w < best[v]) {
                    best[v] = w;
                    heap.emplace(w, v);
                }
            }
        }
        return total;
    }
};
