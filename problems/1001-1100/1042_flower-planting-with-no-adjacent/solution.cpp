class Solution {
  public:
    vector<int> gardenNoAdj(int n, vector<vector<int>> &paths) {
        vector<vector<int>> adj(n + 1);
        for (auto &path : paths) {
            int x = path[0], y = path[1];
            adj[x].push_back(y);
            adj[y].push_back(x);
        }

        vector<int> color(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            bool used[5] = {false, false, false, false, false};
            for (int neighbor : adj[i]) {
                if (color[neighbor] != 0) {
                    used[color[neighbor]] = true;
                }
            }
            for (int c = 1; c <= 4; c++) {
                if (!used[c]) {
                    color[i] = c;
                    break;
                }
            }
        }

        return vector<int>(color.begin() + 1, color.end());
    }
};
