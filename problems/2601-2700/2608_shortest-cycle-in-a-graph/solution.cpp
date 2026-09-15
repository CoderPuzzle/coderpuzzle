class Solution {
  public:
    int findShortestCycle(int n, vector<vector<int>> &edges) {
        // BFS from every vertex: non-tree edges (u, v) close cycles of length
        // dist[u] + dist[v] + 1 through the root's levels, and scanning all
        // roots measures every cycle at one of its own vertices.
        vector<vector<int>> adj(n);
        for (auto &edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }
        int best = -1;
        vector<int> dist(n, -1), parent(n, -1);
        for (int start = 0; start < n; ++start) {
            fill(dist.begin(), dist.end(), -1);
            fill(parent.begin(), parent.end(), -1);
            queue<int> bfs;
            bfs.push(start);
            dist[start] = 0;
            while (!bfs.empty()) {
                int u = bfs.front();
                bfs.pop();
                for (int v : adj[u]) {
                    if (dist[v] == -1) {
                        dist[v] = dist[u] + 1;
                        parent[v] = u;
                        bfs.push(v);
                    } else if (parent[u] != v && parent[v] != u) {
                        // Tree edges would double-count one path instead of
                        // closing a ring, so only genuine cross links count.
                        int length = dist[u] + dist[v] + 1;
                        if (best == -1 || length < best)
                            best = length;
                    }
                }
            }
        }
        return best;
    }
};
