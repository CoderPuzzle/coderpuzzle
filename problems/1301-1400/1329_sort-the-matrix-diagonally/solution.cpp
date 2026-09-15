class Solution {
  public:
    vector<vector<int>> diagonalSort(vector<vector<int>> &mat) {
        // Cells on one diagonal share i - j, so sort each diagonal from its
        // top-row / left-column start and write the values back along the walk.
        int m = (int)mat.size();
        int n = (int)mat[0].size();
        vector<vector<int>> out(m, vector<int>(n));
        for (int si = 0; si < m; ++si) {
            scatter(mat, out, si, 0);
        }
        for (int sj = 1; sj < n; ++sj) {
            scatter(mat, out, 0, sj);
        }
        return out;
    }

  private:
    void scatter(vector<vector<int>> &mat, vector<vector<int>> &out, int si, int sj) {
        int m = (int)mat.size();
        int n = (int)mat[0].size();
        vector<int> diag;
        for (int i = si, j = sj; i < m && j < n; ++i, ++j) {
            diag.push_back(mat[i][j]);
        }
        sort(diag.begin(), diag.end());
        int k = 0;
        for (int i = si, j = sj; i < m && j < n; ++i, ++j) {
            out[i][j] = diag[k++];
        }
    }
};
