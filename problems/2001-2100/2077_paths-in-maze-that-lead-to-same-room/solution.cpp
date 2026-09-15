class Solution {
  public:
    int numberOfPaths(int n, vector<vector<int>> &corridors) {
        vector<int> degree(n + 1);
        for (const auto &corridor : corridors) {
            ++degree[corridor[0]];
            ++degree[corridor[1]];
        }

        vector<unordered_set<int>> forward(n + 1);
        for (const auto &corridor : corridors) {
            int u = corridor[0];
            int v = corridor[1];
            if (degree[u] > degree[v] || (degree[u] == degree[v] && u > v)) {
                swap(u, v);
            }
            forward[u].insert(v);
        }

        int triangles = 0;
        for (int u = 1; u <= n; ++u) {
            for (int v : forward[u]) {
                for (int w : forward[u]) {
                    if (forward[v].count(w) != 0)
                        ++triangles;
                }
            }
        }
        return triangles;
    }
};
