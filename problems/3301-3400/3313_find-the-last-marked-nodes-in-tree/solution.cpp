class Solution {
  public:
    vector<int> lastMarkedNodes(vector<vector<int>> &edges) {
        int n = edges.size() + 1;
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Marking spreads one BFS layer per second, so the last marked node
        // for a start i is a farthest node from i, and a farthest node from
        // any node is always an endpoint of a diameter. Two sweeps find the
        // diameter endpoints u and v; the distance arrays from both then
        // answer every i at once -- the farther endpoint is a last-marked
        // node, and on a tie either endpoint qualifies.
        auto bfs = [&](int src) {
            vector<int> dist(n, -1);
            vector<int> queue;
            queue.reserve(n);
            dist[src] = 0;
            queue.push_back(src);
            int far = src;
            for (size_t head = 0; head < queue.size(); ++head) {
                int node = queue[head];
                for (int nxt : adj[node]) {
                    if (dist[nxt] == -1) {
                        dist[nxt] = dist[node] + 1;
                        if (dist[nxt] > dist[far])
                            far = nxt;
                        queue.push_back(nxt);
                    }
                }
            }
            return make_pair(dist, far);
        };

        int u = bfs(0).second;
        auto [distU, v] = bfs(u);
        vector<int> distV = bfs(v).first;
        vector<int> ans(n);
        for (int i = 0; i < n; ++i) {
            ans[i] = distU[i] > distV[i] ? u : v;
        }
        return ans;
    }
};
