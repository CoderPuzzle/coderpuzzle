class Solution {
  public:
    vector<vector<int>> constructProductMatrix(vector<vector<int>> &grid) {
        // Division is unavailable: 12345 = 3 * 5 * 823 is composite and grid
        // values routinely share factors with it, so there is no modular
        // inverse to divide by. Flatten the matrix in row-major order —
        // excluding grid[i][j] is excluding one position of that sequence —
        // and multiply the prefix (everything before the position) by the
        // suffix (everything after it). Every factor is reduced below 12345
        // first, so each intermediate product stays below 12345^2 and fits
        // in an int.
        const int MOD = 12345;
        int n = grid.size(), m = grid[0].size(), total = n * m;
        vector<int> flat(total);
        int k = 0;
        for (const auto &row : grid) {
            for (int v : row) {
                flat[k++] = v % MOD;
            }
        }
        vector<int> prefix(total + 1, 1), suffix(total + 1, 1);
        for (int t = 0; t < total; t++) {
            prefix[t + 1] = prefix[t] * flat[t] % MOD;
            suffix[total - 1 - t] = suffix[total - t] * flat[total - 1 - t] % MOD;
        }
        vector<vector<int>> result(n, vector<int>(m));
        k = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                result[i][j] = prefix[k] * suffix[k + 1] % MOD;
                k++;
            }
        }
        return result;
    }
};
