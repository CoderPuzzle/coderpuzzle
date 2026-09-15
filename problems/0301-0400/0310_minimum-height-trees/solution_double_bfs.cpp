class Solution {
  public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>> &edges) {
        vector<vector<int>> adjacency(n);
        for (auto &e : edges) {
            adjacency[e[0]].push_back(e[1]);
            adjacency[e[1]].push_back(e[0]);
        }
        vector<int> dist(n), parent(n);
        // One BFS from src: fills dist and parent, returns the farthest
        // node from src.
        auto farthestFrom = [&](int src) {
            fill(dist.begin(), dist.end(), -1);
            dist[src] = 0;
            parent[src] = -1;
            vector<int> queue = {src};
            for (size_t head = 0; head < queue.size(); head++) {
                int u = queue[head];
                for (int v : adjacency[u]) {
                    if (dist[v] < 0) {
                        dist[v] = dist[u] + 1;
                        parent[v] = u;
                        queue.push_back(v);
                    }
                }
            }
            int best = 0;
            for (int i = 1; i < n; i++) {
                if (dist[i] > dist[best]) {
                    best = i;
                }
            }
            return best;
        };
        // Two-shot diameter: the farthest node from any start is one end of
        // a longest path, and the farthest node from there is the other end.
        int u = farthestFrom(0);
        int v = farthestFrom(u);
        // Climb v back to u along discovery parents: the diameter path.
        vector<int> path;
        for (int x = v; x != -1; x = parent[x]) {
            path.push_back(x);
        }
        int d = dist[v];
        // The minimal-height roots are the path's middle: one node when the
        // diameter has an even number of edges, two adjacent middles when odd.
        if (d % 2 == 0) {
            return {path[d / 2]};
        }
        int a = path[d / 2], b = path[d / 2 + 1];
        return {min(a, b), max(a, b)};
    }
};
