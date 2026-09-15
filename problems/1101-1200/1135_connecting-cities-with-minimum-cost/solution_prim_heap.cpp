class Solution {
  public:
    int minimumCost(int n, vector<vector<int>> &connections) {
        // adjacency over n + 1 slots (index 0 unused; nodes are 1-based);
        // each link is filed once per direction
        vector<vector<pair<int, int>>> adj(n + 1);
        for (const auto &link : connections) {
            adj[link[0]].push_back({link[2], link[1]});
            adj[link[1]].push_back({link[2], link[0]});
        }
        // Prim: grow one tree outward from node 1; the cheapest offer
        // leaving the tree is always safe to buy
        priority_queue<tuple<int, int>, vector<tuple<int, int>>, greater<tuple<int, int>>> heap;
        heap.emplace(0, 1);
        vector<bool> visited(n + 1, false);
        int total = 0;
        int settled = 0;
        while (!heap.empty() && settled < n) {
            auto [cost, v] = heap.top();
            heap.pop();
            // stale-entry guard: v already joined via an offer at most
            // this cheap
            if (visited[v]) {
                continue;
            }
            visited[v] = true;
            total += cost;
            settled++;
            for (const auto &[w, u] : adj[v]) {
                if (!visited[u]) {
                    heap.emplace(w, u);
                }
            }
        }
        // queue drained before every node joined: the catalogue cannot
        // connect all n nodes
        return settled == n ? total : -1;
    }
};
