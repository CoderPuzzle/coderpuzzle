class Solution {
  public:
    vector<bool> gridIllumination(int n, vector<vector<int>> &lamps, vector<vector<int>> &queries) {
        unordered_map<int, int> row, col, diag, antiDiag;
        unordered_set<long long> on;

        auto encode = [](int x, int y) -> long long { return (long long)x * 2000000000LL + y; };

        for (auto &lamp : lamps) {
            int x = lamp[0], y = lamp[1];
            if (!on.insert(encode(x, y)).second) {
                continue;
            }
            row[x]++;
            col[y]++;
            diag[x - y]++;
            antiDiag[x + y]++;
        }

        vector<bool> ans(queries.size());
        for (size_t i = 0; i < queries.size(); i++) {
            int x = queries[i][0], y = queries[i][1];
            ans[i] = row[x] > 0 || col[y] > 0 || diag[x - y] > 0 || antiDiag[x + y] > 0;

            for (int dx = -1; dx <= 1; dx++) {
                for (int dy = -1; dy <= 1; dy++) {
                    int px = x + dx, py = y + dy;
                    if (on.erase(encode(px, py)) > 0) {
                        row[px]--;
                        col[py]--;
                        diag[px - py]--;
                        antiDiag[px + py]--;
                    }
                }
            }
        }

        return ans;
    }
};
