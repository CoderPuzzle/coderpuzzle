class Solution {
  public:
    bool validPath(int n, vector<vector<int>> &edges, int source, int destination) {
        // Build the adjacency list, then run a breadth-first search from
        // source. The graph is undirected, so every edge is added in both
        // directions. A visited array keeps the search from re-processing
        // nodes; if destination is reached the path exists, and when the
        // queue empties without reaching it, no path can exist either.
        vector<vector<int>> graph(n);
        for (const auto &edge : edges) {
            graph[edge[0]].push_back(edge[1]);
            graph[edge[1]].push_back(edge[0]);
        }
        if (source == destination)
            return true;
        vector<bool> visited(n, false);
        visited[source] = true;
        queue<int> pending;
        pending.push(source);
        while (!pending.empty()) {
            int node = pending.front();
            pending.pop();
            for (int neighbor : graph[node]) {
                if (neighbor == destination)
                    return true;
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    pending.push(neighbor);
                }
            }
        }
        return false;
    }
};
