class Solution {
  public:
    int unhappyFriends(int n, vector<vector<int>> &preferences, vector<vector<int>> &pairs) {
        // rank[i][j] = how highly friend i ranks friend j (lower = more preferred).
        vector<vector<int>> rank(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) {
            for (int position = 0; position < (int)preferences[i].size(); position++) {
                rank[i][preferences[i][position]] = position;
            }
        }

        vector<int> partner(n);
        for (auto &pair : pairs) {
            partner[pair[0]] = pair[1];
            partner[pair[1]] = pair[0];
        }

        int unhappy = 0;
        for (int x = 0; x < n; x++) {
            int y = partner[x];
            for (int u = 0; u < n; u++) {
                if (u == x || u == y) {
                    continue;
                }
                int v = partner[u];
                if (rank[x][u] < rank[x][y] && rank[u][x] < rank[u][v]) {
                    unhappy++;
                    break;
                }
            }
        }
        return unhappy;
    }
};
