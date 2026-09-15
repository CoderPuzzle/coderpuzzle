class Solution {
  public:
    int shortestPathLength(vector<vector<int>> &graph) {
        int n = graph.size();
        int full = (1 << n) - 1;
        // Walks may revisit nodes, so the state is (node, visited
        // bitmask) — at most n * 2^n states; the -1 sentinel doubles
        // as the visited marker.
        vector<vector<int>> dist(n, vector<int>(1 << n, -1));
        queue<pair<int, int>> q;
        // Multi-source: seed every (i, 1 << i) at distance 0 and let
        // BFS discover the best starting node itself.
        for (int i = 0; i < n; i++) {
            dist[i][1 << i] = 0;
            q.push({i, 1 << i});
        }
        while (!q.empty()) {
            auto [node, mask] = q.front();
            q.pop();
            // First full mask popped is the shortest walk visiting
            // every node.
            if (mask == full) {
                return dist[node][mask];
            }
            for (int nxt : graph[node]) {
                // Stepping to a neighbor ORs in its bit; BFS explores
                // in nondecreasing distance, so the first reach of a
                // state carries the optimal count.
                int nmask = mask | (1 << nxt);
                if (dist[nxt][nmask] == -1) {
                    dist[nxt][nmask] = dist[node][mask] + 1;
                    q.push({nxt, nmask});
                }
            }
        }
        // Unreachable for the connected graphs the constraints promise.
        return 0;
    }
};
