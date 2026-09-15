class Solution {
  public:
    // Cells with i - j >= 0 form the bottom-left triangle together with
    // the middle diagonal (descending); i - j < 0 is the top-right
    // triangle (ascending). Visiting row-major keeps every diagonal's
    // values in top-left-to-bottom-right order, so one cursor per diagonal
    // pours them back in place.
    vector<vector<int>> sortMatrix(vector<vector<int>> &grid) {
        int n = (int)grid.size();
        vector<vector<int>> diags(2 * n - 1);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                diags[i - j + n - 1].push_back(grid[i][j]);
            }
        }
        for (int k = 0; k < 2 * n - 1; k++) {
            if (k >= n - 1) {
                sort(diags[k].rbegin(), diags[k].rend());
            } else {
                sort(diags[k].begin(), diags[k].end());
            }
        }
        vector<int> pos(2 * n - 1, 0);
        vector<vector<int>> out(n, vector<int>(n));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int k = i - j + n - 1;
                out[i][j] = diags[k][pos[k]++];
            }
        }
        return out;
    }
};
