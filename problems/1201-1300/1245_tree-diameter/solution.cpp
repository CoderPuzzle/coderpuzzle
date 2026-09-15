class Solution {
  public:
    int treeDiameter(vector<vector<int>> &edges) {
        // No edges: a single-node tree, diameter 0.
        if (edges.empty())
            return 0;
        int n = edges.size() + 1;
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        auto bfs = [&](int src) {
            // -1 doubles as the visited marker; a tree has one path between
            // any two nodes, so BFS distances are true path lengths.
            vector<int> dist(n, -1);
            dist[src] = 0;
            deque<int> queue;
            queue.push_back(src);
            int far = src;
            while (!queue.empty()) {
                int u = queue.front();
                queue.pop_front();
                for (int v : adj[u]) {
                    if (dist[v] < 0) {
                        dist[v] = dist[u] + 1;
                        queue.push_back(v);
                        // Track the farthest node on the fly.
                        if (dist[v] > dist[far])
                            far = v;
                    }
                }
            }
            return make_pair(far, dist[far]);
        };

        // Double BFS: the farthest node B from any start is an endpoint of a
        // longest path, so B's eccentricity (second pass) is the diameter.
        int far = bfs(0).first;
        return bfs(far).second;
    }
};
