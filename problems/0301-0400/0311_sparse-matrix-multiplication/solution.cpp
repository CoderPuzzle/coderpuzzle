class Solution {
  public:
    vector<vector<int>> multiply(vector<vector<int>> &mat1, vector<vector<int>> &mat2) {
        int m = mat1.size(), k = mat2.size(), n = mat2[0].size();
        // For each row of mat2, the (column, value) pairs that are nonzero —
        // the only entries a nonzero mat1 cell can ever pair with.
        vector<vector<pair<int, int>>> nonzero2(k);
        for (int p = 0; p < k; ++p) {
            for (int j = 0; j < n; ++j) {
                if (mat2[p][j] != 0)
                    nonzero2[p].push_back({j, mat2[p][j]});
            }
        }
        vector<vector<int>> result(m, vector<int>(n, 0));
        // A zero in mat1 wipes a whole row of products; skip it instead of
        // multiplying every mat2 entry by zero.
        for (int i = 0; i < m; ++i) {
            for (int p = 0; p < k; ++p) {
                int value = mat1[i][p];
                if (value == 0)
                    continue;
                for (const auto &[j, other] : nonzero2[p])
                    result[i][j] += value * other;
            }
        }
        return result;
    }
};
