class Solution {
  public:
    vector<vector<int>> matrixReshape(vector<vector<int>> &mat, int r, int c) {
        // A reshape can only permute elements, never create or destroy them,
        // so the target is legal exactly when the areas agree; any mismatch
        // returns the original matrix untouched.
        int m = mat.size(), n = mat[0].size();
        if (r * c != m * n) {
            return mat;
        }
        vector<vector<int>> reshaped(r, vector<int>(c));
        // One flat index drives both sides: element i sits at mat[i / n][i % n]
        // in the source and belongs at reshaped[i / c][i % c] in the target,
        // so reading i = 0 .. m*n - 1 fills the target in row-traversing order.
        for (int i = 0; i < m * n; ++i) {
            reshaped[i / c][i % c] = mat[i / n][i % n];
        }
        return reshaped;
    }
};
