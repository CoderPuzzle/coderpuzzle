class Solution {
  public:
    vector<vector<int>> rangeAddQueries(int n, vector<vector<int>> &queries) {
        // 2-D difference trick applied row by row.
        vector<vector<int>> diff(n, vector<int>(n + 1, 0));
        for (auto &q : queries) {
            for (int r = q[0]; r <= q[2]; r++) {
                diff[r][q[1]] += 1;
                diff[r][q[3] + 1] -= 1;
            }
        }
        vector<vector<int>> mat(n, vector<int>(n, 0));
        for (int r = 0; r < n; r++) {
            int running = 0;
            for (int c = 0; c < n; c++) {
                running += diff[r][c];
                mat[r][c] = running;
            }
        }
        return mat;
    }
};
