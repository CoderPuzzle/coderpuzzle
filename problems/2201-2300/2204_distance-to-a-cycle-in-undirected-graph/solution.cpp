class Solution {
  public:
    vector<int> distanceToCycle(int n, vector<vector<int>> &edges) {
        vector<vector<int>> adj(n);
        vector<int> degree(n, 0);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
            degree[e[0]] += 1;
            degree[e[1]] += 1;
        }

        // peel off degree-1 leaves; whatever remains is the unique cycle
        vector<bool> removed(n, false);
        deque<int> queue;
        for (int i = 0; i < n; i++) {
            if (degree[i] == 1)
                queue.push_back(i);
        }
        while (!queue.empty()) {
            int u = queue.front();
            queue.pop_front();
            removed[u] = true;
            for (int v : adj[u]) {
                if (!removed[v]) {
                    degree[v] -= 1;
                    if (degree[v] == 1)
                        queue.push_back(v);
                }
            }
        }

        // multi-source BFS from all cycle nodes
        vector<int> dist(n, 0);
        vector<bool> visited(n, false);
        deque<int> bfs;
        for (int u = 0; u < n; u++) {
            if (!removed[u]) {
                visited[u] = true;
                bfs.push_back(u);
            }
        }
        while (!bfs.empty()) {
            int u = bfs.front();
            bfs.pop_front();
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    dist[v] = dist[u] + 1;
                    bfs.push_back(v);
                }
            }
        }
        return dist;
    }
};
